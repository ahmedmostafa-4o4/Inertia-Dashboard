import { Head, router } from "@inertiajs/react";
import Table from "../Table";
import React from "react";
import Notify from "../Notify";


export default function List({ users, auth, status }) {
    const { data } = users;

    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Image", accessor: "image_path" },
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone Number", accessor: "phone_number" },
            { Header: "Address", accessor: "address" },
            { Header: "Created at", accessor: "created_at" },
            { Header: "Updated at", accessor: "updated_at" },
        ],
        []
    );

    return (
        <>
            <Head title="Users" />
            <div className="title !justify-end"></div>
            <Table
                auth={auth}
                data={data}
                columns={columns}
                title={"Users List"}
                checkBox={true}
                show={"users.show"}
                className="users-table"
                actions={{
                    deleteAll: (rows) =>
                        router.post(route("users.deleteMultiple"), {
                            ids: rows,
                        }),
                    notification: (rows) => {
                        router.get(route("notification.create"), {
                            ids: rows,
                        });
                    },
                    edit: (id) => route("users.edit", id),
                    delete: (id) => router.delete(route("users.destroy", id)),
                }}
            />
            {status.success ? <Notify message={status.success} /> : null}
        </>
    );
}

List.header = "Users";
