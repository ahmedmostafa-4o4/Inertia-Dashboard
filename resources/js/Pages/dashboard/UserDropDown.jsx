import Dropdown from "@/Components/Dropdown";
import {
    faAngleRight,
    faBell,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useState } from "react";

function UserDropDown({ auth }) {
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
                            <span className="red-dot"></span>
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
                            <Link href={route("profile.notifications")}>
                                <FontAwesomeIcon icon={faBell} />
                                Notifications
                            </Link>
                        </div>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export default UserDropDown;
