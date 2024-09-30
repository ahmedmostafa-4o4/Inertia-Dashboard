import Sidebar from "./dashboard/Sidebar";
import Nav from "./dashboard/Nav";
import { usePage } from "@inertiajs/react";
export default function Main({ auth, children, header }) {
    return (
        <div className="dashboard-body">
            <div className="sidebar-contain">Welcome</div>
            <Sidebar auth={auth} />
            <div className="dashboard">
                <Nav header={header} auth={auth} />
                {children}
            </div>
        </div>
    );
}
