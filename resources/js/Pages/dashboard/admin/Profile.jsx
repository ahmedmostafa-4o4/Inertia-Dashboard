import Main from "@/Pages/Main";
import {
    faBell,
    faRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";

export default function Profile({ admin, imageUrl }) {
    console.log(imageUrl);
    return (
        <div className="profile">
            <Main header={"Profile"}>
                <Head title="Profile" />
                <div className="title">
                    <h1>{admin.name}'s Profile</h1>
                    <div className="actions">
                        <button className="secondary">
                            <FontAwesomeIcon icon={faBell} />
                            Send Notification
                        </button>
                        <button className="primary">
                            {" "}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Edit
                        </button>
                        <button className="danger">
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="data-body">
                    <div className="image">
                        <img src={imageUrl} alt="" />
                    </div>
                    <div className="detailes">
                        <div className="name">
                            <p>{admin.name}</p>
                        </div>
                        <div className="email">
                            <p>Email Address: </p>
                            <p>{admin.email}</p>
                        </div>
                        <div className="phone-number">
                            <p>Phone Number: </p>
                            <p>{admin.phone_number}</p>
                        </div>
                        <div className="role">
                            <p>Role: </p>
                            <p>{admin.role}</p>
                        </div>
                        <div className="created_at">
                            <p>Created at: </p>
                            <p>{admin.created_at}</p>
                        </div>
                        <div className="updated_at">
                            <p>Updated at: </p>
                            <p>{admin.updated_at}</p>
                        </div>
                        <div className="created_by">
                            <p>Created by: </p>
                            <p>Mohammed Ahmed</p>
                        </div>
                        <div className="updated_by">
                            <p>Updated by: </p>
                            <p>Khaled Ali</p>
                        </div>
                    </div>
                </div>
            </Main>
        </div>
    );
}
