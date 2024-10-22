import Main from "@/Pages/Main";
import {
    faBell,
    faRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import Notify from "../Notify";

export default function Show({ auth, admin, status }) {
    return (
        <div className="profile">
            <Main header={"Profile"} auth={auth}>
                <Head title="Profile" />
                <div className="title">
                    <h1>{admin.name}'s Profile</h1>
                    <div className="actions">
                        <button
                            className="secondary"
                            onClick={() =>
                                router.get(route("notification.create"), {
                                    ids: [admin.id],
                                })
                            }
                        >
                            <FontAwesomeIcon icon={faBell} />
                            Send Notification
                        </button>
                        <button
                            className="primary"
                            onClick={() =>
                                router.get(route("admins.edit", admin.id))
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Edit
                        </button>
                        <button
                            className="danger"
                            onClick={() =>
                                router.delete(route("admins.destroy", admin.id))
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete
                        </button>
                    </div>
                </div>

                <div className="data-body">
                    <div className="image">
                        <img src={`/storage/${admin.image_path}`} alt="" />
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
            {status ? <Notify message={status} /> : null}
        </div>
    );
}
