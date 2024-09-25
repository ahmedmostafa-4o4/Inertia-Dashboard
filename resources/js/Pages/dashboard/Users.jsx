import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";
import Main from "../Main";
import { Head } from "@inertiajs/react";

function Users() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const req = await axios.get("https://fakestoreapi.com/products");
        const res = await req.data;
        res && setProducts(res);
    };

    const columns = React.useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Title", accessor: "title" },
            { Header: "Price", accessor: "price" },
            { Header: "Description", accessor: "description" },
            { Header: "Category", accessor: "category" },
            { Header: "Image", accessor: "image" },
        ],
        []
    );

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Main>
            <Head title="Users" />
            {products.length && (
                <Table data={products} columns={columns} title={"Users"} />
            )}
        </Main>
    );
}

export default Users;
