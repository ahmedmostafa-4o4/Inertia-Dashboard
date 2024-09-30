import Main from "@/Pages/Main";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link } from "@inertiajs/react";
import Table from "../Table";
import React from "react";

export default function List({ admins, auth }) {
    console.log(admins);
    const { data } = admins;
    const handleMenu = (btn) => {
        const submenu = btn.nextElementSibling;
        // Toggle the active class on the clicked menu item
        btn.classList.toggle("active");
        btn.lastChild.classList.toggle("arrow-down");
        // Smoothly expand or collapse the submenu
        if (submenu.classList.contains("main-submenu")) {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
        if (submenu.style.maxHeight) {
            submenu.style.maxHeight = null;
        } else {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    };

    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone Number", accessor: "phone_number" },
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
            <Table data={data} columns={columns} title={"Admins"} />
        </Main>
    );
}
