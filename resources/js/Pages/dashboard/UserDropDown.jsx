import Dropdown from "@/Components/Dropdown";
import {
    faAngleRight,
    faMessage,
    faRightFromBracket,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, router } from "@inertiajs/react";

function UserDropDown({ auth, unReadnotificationsCount }) {
    return (
        <div className="user-dropdown dropdown">
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="image dropdown-toggle">
                        <div>
                            <img
                                src={`/storage/${auth.user.image_path}`}
                                alt=""
                            />
                            {unReadnotificationsCount !== 0 && (
                                <span className="red-dot"></span>
                            )}
                        </div>{" "}
                        <p>{auth.user.name}</p>
                        <FontAwesomeIcon icon={faSortDown} />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div className="profile-component dropdown-menu">
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
                        <div className="options">
                            <Link
                                href={route("profile.notifications")}
                                className="!justify-center"
                            >
                                <FontAwesomeIcon icon={faMessage} />
                                Chats
                                {unReadnotificationsCount !== 0 ? (
                                    <span className=" size-4 rounded-full bg-red-800 text-xs flex justify-center align-middle">
                                        {unReadnotificationsCount > 99
                                            ? "99+"
                                            : unReadnotificationsCount}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </Link>
                            <div className="actions ">
                                <button
                                    className="logout danger"
                                    onClick={() =>
                                        router.post(route("admin.logout"))
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faRightFromBracket}
                                    />
                                    <p>Logout</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export default UserDropDown;
