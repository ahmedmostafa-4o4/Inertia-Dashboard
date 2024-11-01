import Main from "@/Pages/Main";
import {
    faBell,
    faRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import Notify from "../Notify";

export default function Show({ auth, admin, status }) {
    const { data } = admin;
    console.log(admin);

    return (
        <div className="profile">
            <Main header={"Profile"} auth={auth}>
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
                                router.get(route("admins.edit", data.id))
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Edit
                        </button>
                        <button
                            className="danger"
                            onClick={() =>
                                router.delete(route("admins.destroy", data.id))
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
                        <img src={`/storage/${data.image_path}`} alt="" />
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
                        <div className="role">
                            <p>Role: </p>
                            <p>{data.role}</p>
                        </div>
                        <div className="created_at">
                            <p>Created at: </p>
                            <p>{data.created_at}</p>
                        </div>
                        <div className="updated_at">
                            <p>Updated at: </p>
                            <p>{data.updated_at}</p>
                        </div>
                        <p className="created-by ">
                            <h4>Created by:</h4>

                            <Link
                                className="underline"
                                href={
                                    data.created_by.id
                                        ? route(
                                              "admins.show",
                                              data.created_by.id
                                          )
                                        : data.created_by
                                }
                            >
                                {data.created_by.name
                                    ? data.created_by.name
                                    : data.created_by}
                            </Link>
                        </p>
                        <div className="updated_by">
                            <p className="updated_by ">
                                <h4>Updated by:</h4>

                                <Link
                                    className="underline"
                                    href={
                                        data.updated_by.id
                                            ? route(
                                                  "admins.show",
                                                  data.updated_by.id
                                              )
                                            : data.updated_by
                                    }
                                >
                                    {data.updated_by.name
                                        ? data.updated_by.name
                                        : data.updated_by}{" "}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </Main>
            {status.success ? <Notify message={status.success} /> : null}
        </div>
    );
}
