import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link } from "@inertiajs/react";
import Table from "../Table";
import React from "react";

export default function Product({ product }) {
    const { data } = product;
    const _data = React.useMemo(
        () => [
            { name: "John", age: 28, status: "Active" },
            { name: "Doe", age: 23, status: "Inactive" },
            { name: "Jane", age: 32, status: "Active" },
            { name: "John", age: 28, status: "Active" },
            { name: "Doe", age: 23, status: "Inactive" },
            { name: "Jane", age: 32, status: "Active" },
            { name: "John", age: 28, status: "Active" },
            { name: "Doe", age: 23, status: "Inactive" },
            { name: "Jane", age: 32, status: "Active" },
            { name: "John", age: 28, status: "Active" },
            { name: "Doe", age: 23, status: "Inactive" },
            { name: "Jane", age: 32, status: "Active" },
            { name: "John", age: 28, status: "Active" },
            { name: "Doe", age: 23, status: "Inactive" },
            { name: "Jane", age: 32, status: "Active" },
            // More data...
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: "Name", accessor: "name" },
            { Header: "Age", accessor: "age" },
            { Header: "Status", accessor: "status" },
        ],
        []
    );

    return (
        <>
            <Head title="Product" />
            <div className="product-page">
                <div className="title">
                    <h1>Product</h1>
                    <div className="actions">
                        <button className="primary">Edit</button>
                        <button className="danger">Delete</button>
                    </div>
                </div>

                <div className="data-body">
                    <div className="image">
                        <img src={`${data.image1}`} alt="" />
                    </div>

                    <div className="detailes">
                        <div className="category-rate">
                            <p className="category">{data.category}</p>
                            <div className="rate">
                                <div>
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                </div>

                                <p>4.5</p>
                            </div>
                        </div>
                        <h1 className="name">{data.title}</h1>
                        <p className="description">{data.description}</p>
                        <p className="price"> {data.price} EG</p>
                        <div className="by-section">
                            <p className="stock">
                                <h4>Stock:</h4> {data.stock} Pieces
                            </p>
                            <p className="ordered-by">
                                <h4>Ordered by:</h4> 457 Client
                            </p>
                            <p className="returned-by">
                                <h4>Returned by:</h4> 38 Client
                            </p>
                            <p className="created-at">
                                <h4>Created at:</h4> {data.created_at}
                            </p>
                            <p className="updated-at">
                                <h4>Updated at:</h4> {data.updated_at}
                            </p>
                            <p className="created-by ">
                                <h4>Created by:</h4>

                                <Link
                                    className="underline"
                                    href={route(
                                        "admins.show",
                                        data.created_by.id
                                    )}
                                >
                                    {data.created_by.name}
                                </Link>
                            </p>
                            <p className="updated-by">
                                <h4>Updated by:</h4>{" "}
                                <Link
                                    className="underline"
                                    href={route(
                                        "admins.show",
                                        data.updated_by.id
                                    )}
                                >
                                    {data.updated_by.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Table data={_data} columns={columns} title={"Ordered By"} />
            <Table data={_data} columns={columns} title={"Returned By"} />
        </>
    );
}
Product.header = "Product";
