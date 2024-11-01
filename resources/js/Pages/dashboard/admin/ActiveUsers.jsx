import { useEffect, useRef, useState } from "react";
import Overlay from "../Overlay";
import axios from "axios";
import UserImage from "@/Components/UserImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { router } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function ActiveUsers() {
    const sidebarRef = useRef();
    const [open, setOpen] = useState(false);
    const handleUsersSidebar = () => {
        if (sidebarRef.current.classList.contains("hide")) {
            sidebarRef.current.classList.replace("hide", "show");
            setOpen(true);
        } else {
            sidebarRef.current.classList.replace("show", "hide");
            setOpen(false);
        }
    };

    // /////////////////////////////////////////////////////////////////
    const [usersStatus, setUsersStatus] = useState([]);

    // Function to fetch all users' activity status
    const fetchUsersActivity = () => {
        axios.get(route("admin.users.activity")).then((response) => {
            setUsersStatus(response.data);
        });
    };

    useEffect(() => {
        // Fetch users' activity on component mount
        fetchUsersActivity();

        // Optionally, check every 5 seconds to update the statuses
        const interval = setInterval(fetchUsersActivity, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
    // /////////////////////////////////////////////////////////////////
    return (
        <>
            {open && (
                <Overlay
                    style={{ display: "block" }}
                    handleSideBar={handleUsersSidebar}
                />
            )}

            <div className="users-sidebar hide" ref={sidebarRef}>
                <div className="users">
                    <h1>
                        Online (
                        {
                            usersStatus.filter(
                                (user) => user.status === "online"
                            ).length
                        }
                        )
                    </h1>
                    {usersStatus.length &&
                        usersStatus.map(
                            (user) =>
                                user.status === "online" && (
                                    <div className="relative">
                                        <div
                                            key={user.user_id}
                                            className="user cursor-pointer"
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "admins.show",
                                                        user.user_id
                                                    )
                                                )
                                            }
                                        >
                                            <UserImage
                                                src={user.image_path}
                                                status={user.status}
                                            />
                                            <div className="detailes">
                                                <h5
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        router.get(
                                                            route(
                                                                "admins.show",
                                                                user.user_id
                                                            )
                                                        )
                                                    }
                                                >
                                                    {user.name}
                                                </h5>
                                                <p>{user.email}</p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.get(
                                                        route(
                                                            "notification.create"
                                                        ),
                                                        {
                                                            ids: [user.user_id],
                                                        }
                                                    );
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faMessage}
                                                />
                                            </button>
                                            <Dropdown>
                                                <Dropdown.Link
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    href={route(
                                                        "userRequests",
                                                        user.user_id
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faUserSecret}
                                                    />
                                                </Dropdown.Link>
                                            </Dropdown>
                                        </div>
                                    </div>
                                )
                        )}

                    <h1>
                        Offline (
                        {
                            usersStatus.filter(
                                (user) => user.status !== "online"
                            ).length
                        }
                        )
                    </h1>
                    {usersStatus.length &&
                        usersStatus.map(
                            (user) =>
                                user.status !== "online" && (
                                    <div
                                        key={user.user_id}
                                        className="user cursor-pointer"
                                        onClick={() =>
                                            router.get(
                                                route(
                                                    "admins.show",
                                                    user.user_id
                                                )
                                            )
                                        }
                                    >
                                        <UserImage
                                            src={user.image_path}
                                            status={user.status}
                                        />
                                        <div className="detailes ">
                                            <h5>{user.name}</h5>
                                            <p>{user.email}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.get(
                                                    route(
                                                        "notification.create"
                                                    ),
                                                    {
                                                        ids: [user.user_id],
                                                    }
                                                );
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faMessage} />
                                        </button>
                                        <Dropdown>
                                            <Dropdown.Link
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                href={route(
                                                    "userRequests",
                                                    user.user_id
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUserSecret}
                                                />
                                            </Dropdown.Link>
                                        </Dropdown>
                                    </div>
                                )
                        )}
                </div>

                <button
                    className="users-btn"
                    onClick={() => handleUsersSidebar()}
                ></button>
            </div>
        </>
    );
}
