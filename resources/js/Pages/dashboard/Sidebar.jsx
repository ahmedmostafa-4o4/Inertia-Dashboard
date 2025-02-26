import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router } from "@inertiajs/react";
import {
    faAngleRight,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
function Sidebar({ auth }) {
    const handleMenu = (btn) => {
        const submenu = btn.nextElementSibling;
        // Toggle the active class on the clicked menu item
        btn.classList.toggle("active");
        btn.lastChild.classList.toggle("arrow-down");
        // Smoothly expand or collapse the submenu
        if (submenu.style.maxHeight) {
            submenu.style.maxHeight = null;
        } else {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
        }
    };

    return (
        <div className="dashboard-sidebar show ">
            <div className="logo">
                {/* <Link to={"/"}>
                    {" "}
                    <img src="/logo192.png" alt="" />
                </Link> */}
            </div>
            <div className="profile-component">
                <img src={`/storage/${auth.user.image_path}`} alt="" />
                <p>{auth.user.name}</p>
                <span className="text-slate-400 font-thin text-xs">
                    {auth.user.email}
                </span>
                <span className="text-slate-400 font-thin text-xs">
                    {auth.user.role}
                </span>
                <Link href={route("admin.profile")}>
                    View profile <FontAwesomeIcon icon={faAngleRight} />
                </Link>
            </div>
            <div className="links">
                <div className="menu-holder">
                    <button className="menu-item home-btn">
                        <Link href={route("home")}>Home</Link>
                    </button>
                </div>
                {auth.user.role === "owner" ? (
                    <>
                        <div className="menu-holder">
                            <button
                                className="menu-item"
                                onClick={(btn) => handleMenu(btn.currentTarget)}
                            >
                                Admins
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                            <div className="submenu">
                                <Link href={route("admins.index")}>
                                    <span className="dot"></span>
                                    <p>Admins List</p>
                                </Link>
                                <Link href={route("admins.create")}>
                                    <span className="dot"></span>

                                    <p>New Admin</p>
                                </Link>
                            </div>
                        </div>
                        <div className="menu-holder">
                            <button
                                className="menu-item"
                                onClick={(btn) => handleMenu(btn.currentTarget)}
                            >
                                Users
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                            <div className="submenu">
                                <Link href={route("users.index")}>
                                    <span className="dot"></span>
                                    <p>Users List</p>
                                </Link>
                                <Link href={route("users.create")}>
                                    <span className="dot"></span>

                                    <p>New User</p>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : null}
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Products
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link href={route("products.index")}>
                            <span className="dot"></span>
                            <p>Products List</p>
                        </Link>
                        <Link href={route("products.create")}>
                            <span className="dot"></span>
                            <p>Add Product</p>
                        </Link>
                    </div>
                </div>
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Categories
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link href={route("categories.index")}>
                            <span className="dot"></span>
                            <p>Categories List</p>
                        </Link>
                        <Link href={route("categories.create")}>
                            <span className="dot"></span>
                            <p>Add Category</p>
                        </Link>
                    </div>
                </div>

                {/* <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Users
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link to={"user"}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Users List</p>
                        </Link>
                        <Link href={route("addUser")}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Add User</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faGears} />
                            <p>Send Notifications</p>
                        </Link>
                    </div>
                </div>
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Customers
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link to={"user"}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Customers List</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faGears} />
                            <p>Send Notifications</p>
                        </Link>
                    </div>
                </div>
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Returns
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link href={route("returns")}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Returns List</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Verify Return</p>
                        </Link>
                        <Link href={route("addReturn")}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Add Return</p>
                        </Link>
                    </div>
                </div>
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Orders
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link href={route("orders")}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Orders List</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Verify Orders</p>
                        </Link>
                        <Link href={route("addOrder")}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Add Order</p>
                        </Link>
                    </div>
                </div>

                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Payment Gates
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link to={"user"}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Payment Gates List</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Add Payment Gates</p>
                        </Link>
                    </div>
                </div>
                <div className="menu-holder">
                    <button
                        className="menu-item"
                        onClick={(btn) => handleMenu(btn.currentTarget)}
                    >
                        Global Settings
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <div className="submenu">
                        <Link to={"user"}>
                            <FontAwesomeIcon icon={faUser} />
                            <p>Posters</p>
                        </Link>
                        <Link to={"notifications"}>
                            <FontAwesomeIcon icon={faBell} />
                            <p>Website Info</p>
                        </Link>
                    </div>
                </div> */}
                <div className="actions menu-holder">
                    <button
                        className="logout danger "
                        onClick={() => router.post(route("admin.logout"))}
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <p>Logout</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
