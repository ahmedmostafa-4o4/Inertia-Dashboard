import Main from "@/Pages/Main";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import Table from "../Table";
import React from "react";

export default function Product({ auth }) {
    const data = React.useMemo(
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
        <Main header={"Product"}>
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
                        <img src="/images/default-user.jpg" alt="" />
                    </div>

                    <div className="detailes">
                        <div className="category-rate">
                            <p className="category">Category</p>
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
                        <h1 className="name">Product Name</h1>
                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Deserunt repudiandae modi laborum nihil, harum
                            cum inventore? Laborum eaque illum fuga natus id,
                            magni molestias incidunt explicabo delectus totam
                            nisi quo?
                        </p>
                        <p className="price">299.9 EG</p>
                        <div className="by-section">
                            <p className="stock">
                                <h4>Stock:</h4> 300 Pieces
                            </p>
                            <p className="ordered-by">
                                <h4>Ordered by:</h4> 457 Client
                            </p>
                            <p className="returned-by">
                                <h4>Returned by:</h4> 38 Client
                            </p>
                            <p className="created-at">
                                <h4>Created at:</h4> 2024-3-12 4:33:33
                            </p>
                            <p className="updated-at">
                                <h4>Updated at:</h4> 2024-12-10 11:32:56
                            </p>
                            <p className="created-by">
                                <h4>Created by:</h4> Ahmed Mostafa
                            </p>
                            <p className="updated-by">
                                <h4>Updated by:</h4> Mohammed Ahmed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Table data={data} columns={columns} title={"Ordered By"} />
            <Table data={data} columns={columns} title={"Returned By"} />
        </Main>
    );
}
