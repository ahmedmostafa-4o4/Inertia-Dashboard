import Sidebar from "./dashboard/Sidebar";
import Nav from "./dashboard/Nav";
import { usePage } from "@inertiajs/react";
export default function Main({ children, header }) {
    const { component } = usePage();
    return (
        <div className="dashboard-body">
            <div className="sidebar-contain">Welcome</div>
            <Sidebar />
            <div className="dashboard">
                <Nav header={header} />
                {children}
            </div>
        </div>
    );
}
