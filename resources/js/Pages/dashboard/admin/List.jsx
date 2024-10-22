import Main from "@/Pages/Main";
import { Head, Link, router } from "@inertiajs/react";
import Table from "../Table";
import React, { useEffect, useState } from "react";
import Notify from "../Notify";
import axios from "axios";

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
        <Main header="Admins" auth={auth}>
            <Head title="Admins" />
            <Table
                auth={auth}
                data={data}
                columns={columns}
                title={"Admins List"}
                checkBox={true}
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
        </Main>
    );
}
