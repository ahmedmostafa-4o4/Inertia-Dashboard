import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowDown,
    faArrowUp,
    faBell,
    faSort,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";
import Checkbox from "@/Components/Checkbox";
import Swal from "sweetalert2";
import UserImage from "@/Components/UserImage";

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
    auth,
    columns,
    data,
    title,
    pagination = true,
    search = true,
    sort = true,
    link = null,
    checkBox = false,
    usersStatus = [],
    actions = {
        delete: () => {},
        deleteAll: () => {},
        edit: () => {},
        notification: () => {},
    },
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page, // instead of rows, use page
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        state: { pageIndex },
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
        },
        useFilters, // Hook for filtering
        useSortBy, // Hook for sorting
        usePagination // Hook for pagination
    );

    const alertPopup = (action = () => {}) => {
        Swal.fire({
            title: "Are You Sure?",
            showCancelButton: true,
            confirmButtonText: "Sure",
            showClass: {
                popup: "animate__animated animate__backInDown", // animation on show
            },
            hideClass: {
                popup: "animate__animated animate__backOutDown", // animation on hide
            },
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

    return (
        <>
            <div className="table-container overflow-auto">
                <div className="head">
                    <h2>{title}</h2>
                    {selectedRows.length ? (
                        <div className="flex justify-center gap-1 ">
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
                                    <th className="px-3 py-3 text-right ">
                                        {search && (
                                            <div>
                                                {column.canFilter
                                                    ? column.render("Filter")
                                                    : null}
                                            </div>
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
                                ))}
                                {actions && (
                                    <th
                                        className="px-3 py-3 text-center align-bottom "
                                        colSpan={2}
                                    >
                                        Actions
                                    </th>
                                )}
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
                                        cell.column.id === "name" ? (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-300 text-nowrap hover:underline cursor-pointer"
                                                onClick={() =>
                                                    router.get(
                                                        route(
                                                            "admins.show",
                                                            row.values.id
                                                        )
                                                    )
                                                }
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        ) : cell.column.id === "image_path" ? (
                                            <td
                                                {...cell.getCellProps()}
                                                className="px-3 py-2 text-gray-300 text-nowrap flex justify-center items-center"
                                            >
                                                <UserImage
                                                    src={row.values.image_path}
                                                />
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
                                            <td className="px-3 py-2 text-gray-100 text-nowrap text-center ">
                                                <button
                                                    onClick={() => {
                                                        alertPopup(() =>
                                                            actions.delete(
                                                                row.values.id
                                                            )
                                                        );
                                                    }}
                                                    className="danger"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && (
                <div className="pagination">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                    </button>
                    <span>
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                    </button>
                    {/* <span>
          Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "50px" }}
          />
        </span> */}
                </div>
            )}
        </>
    );
};

export default Table;
