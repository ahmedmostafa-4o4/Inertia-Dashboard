import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head} from "@inertiajs/react";

export default function List() {
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
    return (
        <>
            <Head title="Orders" />
            <input
                type="search"
                placeholder="Search..."
                className="search list"
            />
            <div className="menu-holder order">
                <button
                    className="menu-item "
                    onClick={(btn) => handleMenu(btn.currentTarget)}
                >
                    <p>Ahmed Mostafa's Order</p>
                    <p>2024-12-5 12:20:42</p>

                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <div className="submenu main-submenu">
                    <h4>Client Detailes</h4>

                    <p>Name: Ahmed Mostafa</p>
                    <p>Email Address: ahmedmostafa56@gmail.com</p>
                    <p>Address: 11 Gamal Abdelnaser Street</p>
                    <p>Phone Number: +201025250321</p>
                    <h4>Order Detailes</h4>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-holder order">
                <button
                    className="menu-item "
                    onClick={(btn) => handleMenu(btn.currentTarget)}
                >
                    <p>Ahmed Mostafa's Order</p>
                    <p>2024-12-5 12:20:42</p>

                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <div className="submenu main-submenu">
                    <h4>Client Detailes</h4>

                    <p>Name: Ahmed Mostafa</p>
                    <p>Email Address: ahmedmostafa56@gmail.com</p>
                    <p>Address: 11 Gamal Abdelnaser Street</p>
                    <p>Phone Number: +201025250321</p>
                    <h4>Order Detailes</h4>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-holder order">
                <button
                    className="menu-item "
                    onClick={(btn) => handleMenu(btn.currentTarget)}
                >
                    <p>Moahmmed Ahmed's Order</p>
                    <p>2024-4-2 2:40:10</p>

                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
                <div className="submenu main-submenu">
                    <h4>Client Detailes</h4>

                    <p>Name: Ahmed Mostafa</p>
                    <p>Email Address: ahmedmostafa56@gmail.com</p>
                    <p>Address: 11 Gamal Abdelnaser Street</p>
                    <p>Phone Number: +201025250321</p>
                    <h4>Order Detailes</h4>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                    <div className="menu-holder order order-detailes-holder">
                        <button
                            className="menu-item"
                            onClick={(btn) => handleMenu(btn.currentTarget)}
                        >
                            <div className="order-detailes">
                                <img src="/images/default-user.jpg" alt="" />
                                <p>Play Station</p>
                            </div>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <div className="submenu">
                            <p>Name: Ahmed Mostafa</p>
                            <p>Email Address: ahmedmostafa56@gmail.com</p>
                            <p>Address: 11 Gamal Abdelnaser Street</p>
                            <p>Phone Number: +201025250321</p>
                            <h4>Order Detailes</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
List.header = "Orders";
