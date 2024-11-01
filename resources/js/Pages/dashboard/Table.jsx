import {
    faAngleLeft,
    faAngleRight,
    faArrowDown,
    faArrowUp,
    faBell,
    faSort,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import Checkbox from "@/Components/Checkbox";
import Swal from "sweetalert2";

// Default filter component
function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
    return (
        <input
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value || undefined)} // Set undefined to remove the filter
            placeholder={`Search...`}
            style={{ width: "100%" }}
            className="search"
        />
    );
}

const Table = ({
    columns,
    data,
    title,
    pagination = true,
    search = true,
    sort = true,
    link = null,
    checkBox = false,
    show = null,
    actions = {
        delete: () => {},
        deleteAll: () => {},
        edit: () => {},
        notification: () => {},
    },
    ...props
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // Use `page` instead of `rows`
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        setPageSize, // Function to change page size
        state: { pageIndex },
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            // initialState: { pageSize },
        },
        useFilters, // Hook for filtering
        useSortBy, // Hook for sorting
        usePagination // Hook for pagination
    );
    useEffect(() => {
        setPageSize(5);
    }, []);

    const alertPopup = (action = () => {}) => {
        Swal.fire({
            title: "Are You Sure? <span>You Can't Reverse This Action!</span> <span>If this item related with any other items will get the same impact!</span>",
            showCancelButton: true,
            confirmButtonText: "Sure",
        }).then((result) => {
            if (result.isConfirmed) {
                action();
                setSelectedRows([]);
                // You can handle the textarea value here
            }
        });
    };

    // State to store the IDs of selected rows
    const [selectedRows, setSelectedRows] = useState([]);

    // Function to handle changes when a row's checkbox is toggled
    const handleCheckboxChange = (row) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.some((r) => r.id === row.id)
                ? // If the row is already selected, remove it from selectedRows
                  prevSelectedRows.filter(
                      (selectedRow) => selectedRow.id !== row.id
                  )
                : // Otherwise, add the entire row's data to selectedRows
                  [...prevSelectedRows, row]
        );
    };
    // Function to handle "Select All" checkbox changes
    const handleSelectAllChange = (isChecked) => {
        if (isChecked) {
            // If the checkbox is checked, select all row IDs
            setSelectedRows(data);
        } else {
            // If unchecked, clear the selected rows
            setSelectedRows([]);
        }
    };
    console.log(data);

    return (
        <>
            {pagination && (
                <div className="pagination flex items-center">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="p-2 rounded disabled:bg-slate-900 disabled:text-slate-600"
                        aria-label="Previous Page"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <span className="flex gap-1">
                        {pageOptions.map((_, index) => {
                            // Determine when to show dots
                            const shouldShowFirst = index < 2; // Always show the first 2 pages
                            const shouldShowLast =
                                index >= pageOptions.length - 2; // Always show the last 2 pages
                            const isNearCurrent =
                                Math.abs(pageIndex - index) <= 1; // Show pages near the current page

                            if (
                                shouldShowFirst ||
                                shouldShowLast ||
                                isNearCurrent
                            ) {
                                return (
                                    <button
                                        key={index}
                                        className={`p-2 rounded ${
                                            index === pageIndex &&
                                            "bg-blue-800 "
                                        }`}
                                        onClick={() => gotoPage(index)}
                                        aria-label={`Page ${index + 1}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            } else if (
                                (index === 2 && pageIndex > 3) || // Add ellipsis after the first 2 pages
                                (index === pageOptions.length - 3 &&
                                    pageIndex < pageOptions.length - 4) // Add ellipsis before the last 2 pages
                            ) {
                                return (
                                    <span key={index} className="p-2">
                                        ...
                                    </span>
                                );
                            }
                            return null; // Hide other pages
                        })}
                    </span>

                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="p-2 rounded disabled:bg-slate-900 disabled:text-slate-600"
                        aria-label="Next Page"
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            )}
            <div className={`table-container overflow-auto ${props.className}`}>
                <div className="head ">
                    <h2 className="text-2xl flex gap-4">
                        {title}{" "}
                        <div className="input-style">
                            <select
                                value={page.length}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                                className="mr-4 p-2 border rounded text-sm"
                            >
                                {[5, 10, 20, 30, 50].map((size) => (
                                    <option key={size} value={size}>
                                        Show {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </h2>

                    {selectedRows.length ? (
                        <div className="flex justify-end gap-1 flex-1">
                            {actions.notification && (
                                <button
                                    className="secondary"
                                    onClick={() => {
                                        actions.notification(
                                            selectedRows.map((row) => row.id)
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faBell} />
                                    Send Notification
                                </button>
                            )}

                            {actions.deleteAll && (
                                <button
                                    onClick={() => {
                                        alertPopup(() =>
                                            actions.deleteAll(
                                                selectedRows.map(
                                                    (row) => row.id
                                                )
                                            )
                                        );
                                    }}
                                    className="danger"
                                >
                                    {" "}
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    Delete
                                </button>
                            )}
                        </div>
                    ) : null}
                    {link && <Link href={route(link)}>View All</Link>}
                </div>

                <table
                    {...getTableProps()}
                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    id="dt"
                >
                    <thead className="text-xs text-gray-700 uppercase ">
                        {headerGroups.map((headerGroup) => (
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                className="text-nowrap"
                            >
                                {checkBox && (
                                    <th className="px-3 py-3 text-right align-bottom ">
                                        <Checkbox
                                            onChange={(e) => {
                                                handleSelectAllChange(
                                                    e.target.checked
                                                );
                                            }}
                                            // Check if all rows are selected
                                            checked={
                                                selectedRows.length ===
                                                data.length
                                            }
                                            className="table-header"
                                        />
                                    </th>
                                )}

                                {headerGroup.headers.map((column) => (
                                    <>
                                        <th className="px-3 py-3 text-right ">
                                            {search &&
                                            !(
                                                column.id === "created_at" ||
                                                column.id === "updated_at" ||
                                                column.id === "image_path" ||
                                                column.id === "image1"
                                            ) ? (
                                                <div>
                                                    {column.canFilter
                                                        ? column.render(
                                                              "Filter"
                                                          )
                                                        : null}
                                                </div>
                                            ) : (
                                                <div
                                                    style={{ height: "48px" }}
                                                ></div>
                                            )}
                                            <p className="table-header">
                                                {column.render("Header")}{" "}
                                                {sort && (
                                                    <div>
                                                        <button
                                                            {...column.getHeaderProps(
                                                                column.getSortByToggleProps()
                                                            )}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faSort}
                                                            />
                                                        </button>
                                                        <span>
                                                            {column.isSorted ? (
                                                                column.isSortedDesc ? (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faArrowUp
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faArrowDown
                                                                        }
                                                                    />
                                                                )
                                                            ) : (
                                                                ""
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </p>
                                        </th>
                                    </>
                                ))}
                                {actions.delete ||
                                    (actions.edit && (
                                        <th
                                            className="px-3 py-3 text-center align-bottom "
                                            colSpan={2}
                                        >
                                            Actions
                                        </th>
                                    ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className=" border-b "
                                >
                                    {checkBox && (
                                        <th className="px-3 py-2 text-gray-100 text-nowrap ">
                                            <Checkbox
                                                onChange={() => {
                                                    handleCheckboxChange(
                                                        row.original
                                                    );
                                                }}
                                                // Check if this row is selected
                                                checked={selectedRows.some(
                                                    (selectedRow) =>
                                                        selectedRow.id ===
                                                        row.original.id
                                                )}
                                            />
                                        </th>
                                    )}

                                    {row.cells.map((cell) =>
                                        show &&
                                        (cell.column.id === "name" ||
                                            cell.column.id === "title") ? (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-300 text-nowrap hover:underline cursor-pointer"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            show,
                                                            row.values.id
                                                        )
                                                    )
                                                }
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ) : cell.column.id === "image_path" ||
                                          cell.column.id === "image1" ? (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-300 text-nowrap flex justify-center items-center"
                                            >
                                                <img
                                                    src={`storage/${
                                                        row.values.image_path ||
                                                        row.values.image1
                                                    }`}
                                                />
                                            </td>
                                        ) : cell.column.id === "updated_by" ||
                                          cell.column.id === "created_by" ? (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-300 text-nowrap hover:underline cursor-pointer"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "admins.show",
                                                            cell.column.id ===
                                                                "created_by"
                                                                ? row.values
                                                                      .created_by
                                                                      .id
                                                                : row.values
                                                                      .updated_by
                                                                      .id
                                                        )
                                                    )
                                                }
                                            >
                                                {cell.column.id === "created_by"
                                                    ? row.values.created_by.name
                                                    : row.values.updated_by
                                                          .name}
                                            </td>
                                        ) : (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-100 text-nowrap"
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    )}

                                    {actions && (
                                        <>
                                            {" "}
                                            {actions.edit && (
                                                <td className="px-3 py-2 text-gray-100 text-nowrap text-center ">
                                                    <Link
                                                        href={actions.edit(
                                                            row.values.id
                                                        )}
                                                        className="primary"
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            )}
                                            {actions.delete && (
                                                <td className="px-3 py-2 text-gray-100 text-nowrap text-center ">
                                                    <button
                                                        onClick={() => {
                                                            alertPopup(() =>
                                                                actions.delete(
                                                                    row.values
                                                                        .id
                                                                )
                                                            );
                                                        }}
                                                        className="danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="pagination flex items-center">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="p-2 rounded disabled:bg-slate-900 disabled:text-slate-600"
                        aria-label="Previous Page"
                    >
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <span className="flex gap-1">
                        {pageOptions.map((_, index) => {
                            // Determine when to show dots
                            const shouldShowFirst = index < 2; // Always show the first 2 pages
                            const shouldShowLast =
                                index >= pageOptions.length - 2; // Always show the last 2 pages
                            const isNearCurrent =
                                Math.abs(pageIndex - index) <= 1; // Show pages near the current page

                            if (
                                shouldShowFirst ||
                                shouldShowLast ||
                                isNearCurrent
                            ) {
                                return (
                                    <button
                                        key={index}
                                        className={`p-2 rounded ${
                                            index === pageIndex &&
                                            "bg-blue-800 "
                                        }`}
                                        onClick={() => gotoPage(index)}
                                        aria-label={`Page ${index + 1}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            } else if (
                                (index === 2 && pageIndex > 3) || // Add ellipsis after the first 2 pages
                                (index === pageOptions.length - 3 &&
                                    pageIndex < pageOptions.length - 4) // Add ellipsis before the last 2 pages
                            ) {
                                return (
                                    <span key={index} className="p-2">
                                        ...
                                    </span>
                                );
                            }
                            return null; // Hide other pages
                        })}
                    </span>

                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="p-2 rounded disabled:bg-slate-900 disabled:text-slate-600"
                        aria-label="Next Page"
                    >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            )}
        </>
    );
};

export default Table;
