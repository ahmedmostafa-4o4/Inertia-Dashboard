import {
    faBell,
    faRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import Notify from "../Notify";

export default function Show({  user, status }) {
    const { data } = user;

    return (
        <div className="profile">
            <>
                <Head title="Profile" />
                <div className="title">
                    <h1>{data.name}'s Profile</h1>
                    <div className="actions">
                        <button
                            className="secondary"
                            onClick={() =>
                                router.get(route("notification.create"), {
                                    ids: [data.id],
                                })
                            }
                        >
                            <FontAwesomeIcon icon={faBell} />
                            Send Notification
                        </button>
                        <button
                            className="primary"
                            onClick={() =>
                                router.get(route("users.edit", data.id))
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Edit
                        </button>
                        <button
                            className="danger"
                            onClick={() =>
                                router.delete(route("users.destroy", data.id))
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
                        <img src={`/storage/${data.image}`} alt="user" />
                    </div>
                    <div className="detailes">
                        <div className="name">
                            <p>{data.name}</p>
                        </div>
                        <div className="email">
                            <p>Email Address: </p>
                            <p>{data.email}</p>
                        </div>
                        <div className="phone-number">
                            <p>Phone Number: </p>
                            <p>{data.phone_number}</p>
                        </div>

                        <div className="created_at">
                            <p>Created at: </p>
                            <p>{data.created_at}</p>
                        </div>
                        <div className="updated_at">
                            <p>Updated at: </p>
                            <p>{data.updated_at}</p>
                        </div>
                    </div>
                </div>
            </>
            {status.success ? <Notify message={status.success} /> : null}
        </div>
    );
}
Show.header = "User";
