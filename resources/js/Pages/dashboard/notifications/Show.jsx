import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Main from "../../Main";
import { Head, Link, router } from "@inertiajs/react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ShowNotification({ auth, notification }) {
    const data = JSON.parse(notification.data);
    return (
        <div className="notification-page">
            <Main auth={auth} header={"Notifications"}>
                <Head title="Notifications" />
                <div className="title">
                    <h1>
                        {" "}
                        <Link
                            className="text-sm hover:underline"
                            href={route("admins.show", data.sender_data.id)}
                        >
                            From: {data.sender_data.name}
                        </Link>
                    </h1>

                    <div className="actions">
                        <button
                            className="danger"
                            onClick={() =>
                                router.delete(
                                    route("notification.destroy", notify.id)
                                )
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete
                        </button>
                    </div>
                </div>
                <h1 className="subject">{data.title} </h1>
                <div className="message">{data.message}</div>
            </Main>
        </div>
    );
}
