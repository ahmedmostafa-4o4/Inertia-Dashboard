import { Head, router } from "@inertiajs/react";
import Table from "../Table";
import React from "react";
import Notify from "../Notify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function List({ products, auth, status }) {
    const { data } = products;
    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Image", accessor: "image1" },
            { Header: "Title", accessor: "title" },
            { Header: "Category", accessor: "category" },
            { Header: "Stock", accessor: "stock" },
            { Header: "Price", accessor: "price" },
            { Header: "Rate", accessor: "rate" },
            { Header: "Rate Count", accessor: "rate_count" },
            { Header: "Offer", accessor: "offer" },
            { Header: "Created By", accessor: "created_by" },
            { Header: "Updated By", accessor: "updated_by" },
            { Header: "Created At", accessor: "created_at" },
            { Header: "Updated at", accessor: "updated_at" },
        ],
        []
    );

    return (
        <>
            <Head title="Products" />
            <div className="title !justify-end">
                <div className="actions">
                    <button
                        className="primary"
                        onClick={() => router.get(route("products.create"))}
                    >
                        {" "}
                        <FontAwesomeIcon icon={faPlus} />
                        Add
                    </button>
                </div>
            </div>
            <Table
                auth={auth}
                data={data}
                columns={columns}
                title={"Products List"}
                checkBox={true}
                show={"products.show"}
                actions={{
                    deleteAll: (rows) =>
                        router.post(route("products.destroyAll"), {
                            ids: rows,
                        }),
                    edit: (id) => route("products.edit", id),
                    delete: (id) =>
                        router.delete(route("products.destroy", id)),
                }}
            />
            {status.success ? <Notify message={status.success} /> : null}
        </>
    );
}
List.header = "Products";
