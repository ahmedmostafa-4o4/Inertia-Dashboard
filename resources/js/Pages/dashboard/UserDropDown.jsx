import Dropdown from "@/Components/Dropdown";
import { faAngleRight, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/react";
import { useState } from "react";

function UserDropDown({ auth }) {
    return (
        <div className="user-dropdown dropdown">
            <Dropdown>
                <Dropdown.Trigger>
                    <button className="image dropdown-toggle">
                        <img src={`/storage/${auth.user.image_path}`} alt="" />
                        <FontAwesomeIcon icon={faSortDown} />
                    </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <div className="profile-component dropdown-menu">
                        <img src={`/storage/${auth.user.image_path}`} alt="" />
                        <p>{auth.user.name}</p>
                        <Link href={route("profile", 3)}>
                            View profile <FontAwesomeIcon icon={faAngleRight} />
                        </Link>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export default UserDropDown;
