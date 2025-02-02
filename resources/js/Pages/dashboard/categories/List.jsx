import { Head, router } from "@inertiajs/react";
import Table from "../Table";
import React from "react";
import Notify from "../Notify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function List({ categories, auth, status }) {
    const { data } = categories;
    console.log(data);
    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Title", accessor: "title" },
            { Header: "Created By", accessor: "created_by" },
            { Header: "Updated By", accessor: "updated_by" },
            { Header: "Created At", accessor: "created_at" },
            { Header: "Updated At", accessor: "updated_at" },
        ],
        []
    );

    return (
        <>
            <Head title="Categories" />
            <div className="title !justify-end">
                <div className="actions">
                    <button
                        className="primary"
                        onClick={() => router.get(route("categories.create"))}
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
                title={"Categories List"}
                checkBox={true}
                actions={{
                    deleteAll: (rows) =>
                        router.post(route("categories.destroyMultiple"), {
                            ids: rows,
                        }),
                    edit: (id) => route("categories.edit", id),
                    delete: (id) =>
                        router.delete(route("categories.destroy", id)),
                }}
            />
            {status.success ? <Notify message={status.success} /> : null}
        </>
    );
}
List.header = "Categories";
