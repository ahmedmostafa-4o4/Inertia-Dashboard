import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";

// Default filter component
function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
    return (
        <input
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value || undefined)} // Set undefined to remove the filter
            placeholder={`Search...`}
            style={{ width: "100%" }}
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

    return (
        <>
            <div className="table-container">
                <div className="head">
                    <h5>{title}</h5>
                    {link && <Link href={route(link)}>View All</Link>}
                </div>

                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th>
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
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
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
