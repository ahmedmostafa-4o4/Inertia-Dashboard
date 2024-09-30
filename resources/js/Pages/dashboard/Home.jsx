import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TinyTable from "./TinyTable";
import Table from "./Table";
import React from "react";
import ActiveUsersMap from "./Charts/ActiveUsersMap";
import LineChart from "./Charts/LineChart";
import PieChartWithCenterLabel from "./Charts/PieChart";
import Main from "../Main";
import { Head } from "@inertiajs/react";

function Home({ auth, latitude, longitude }) {
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
        <Main header={"Home"} auth={auth}>
            <Head title="Home" />
            <div className="dashboard-home">
                <div className="totals">
                    <div>
                        <p>Total Sales</p>

                        <span>$34.324.00</span>
                        <div>
                            <p className="up-percent">
                                <FontAwesomeIcon icon={faArrowUp} /> 14%
                            </p>
                            <p>in the last month</p>
                        </div>
                    </div>
                    <div>
                        <p>Total Orders</p>

                        <span>3568</span>
                        <div>
                            <p className="down-percent">
                                <FontAwesomeIcon icon={faArrowDown} /> 14%
                            </p>
                            <p>in the last month</p>
                        </div>
                    </div>
                    <div>
                        <p>Total Revenue</p>

                        <span>$1.458.00</span>
                        <div>
                            <p className="up-percent">
                                <FontAwesomeIcon icon={faArrowUp} /> 40%
                            </p>
                            <p>in the last month</p>
                        </div>
                    </div>
                    <div>
                        <p>Total Customer</p>

                        <span>42.264</span>
                        <div>
                            <p className="down-percent">
                                <FontAwesomeIcon icon={faArrowDown} /> 22%
                            </p>
                            <p>in the last month</p>
                        </div>
                    </div>
                </div>
                <div className="map-widget">
                    <LineChart />
                    <PieChartWithCenterLabel />
                </div>
                <ActiveUsersMap latitude={latitude} longitude={longitude} />
                <div className="data">
                    <div>
                        <TinyTable title={"Recent Users"} link={"users"} />
                        <TinyTable title={"Recent Users"} link={"users"} />
                    </div>
                    <div>
                        <Table
                            data={data}
                            columns={columns}
                            title="Recent Orders"
                            pagination={false}
                            search={false}
                            sort={false}
                            link={"users"}
                        />
                    </div>
                    <div>
                        <TinyTable title={"Recent Customers"} link={"users"} />
                        <TinyTable title={"Recent Customers"} link={"users"} />
                    </div>
                    <div>
                        <Table
                            data={data}
                            columns={columns}
                            title="Top Sales Products"
                        />
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default Home;
