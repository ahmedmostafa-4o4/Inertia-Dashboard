import { Head, router } from "@inertiajs/react";
import Table from "../Table";
import React from "react";
import Notify from "../Notify";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function List({ admins, auth, status }) {
    const { data } = admins;

    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Image", accessor: "image_path" },
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone Number", accessor: "phone_number" },
            { Header: "Role", accessor: "role" },
            { Header: "Created at", accessor: "created_at" },
            { Header: "Updated at", accessor: "updated_at" },
            { Header: "Created by", accessor: "created_by" },
            { Header: "Updated by", accessor: "updated_by" },
        ],
        []
    );

    return (
        <>
            <Head title="Admins" />
            <div className="title !justify-end">
                <div className="actions">
                    <button
                        className="primary"
                        onClick={() => router.get(route("admins.create"))}
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
                title={"Admins List"}
                checkBox={true}
                show={"admins.show"}
                className="admins-table"
                actions={{
                    deleteAll: (rows) =>
                        router.post(route("admin.deleteMultiple"), {
                            ids: rows,
                        }),
                    notification: (rows) => {
                        router.get(route("notification.create"), {
                            ids: rows,
                        });
                    },
                    edit: (id) => route("admins.edit", id),
                    delete: (id) => router.delete(route("admins.destroy", id)),
                }}
            />
            {status ? <Notify message={status} /> : null}
        </>
    );
}
List.header = "Admins";
