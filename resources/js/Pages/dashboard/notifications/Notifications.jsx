import { useEffect, useState } from "react";
import Main from "../../Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Head, router } from "@inertiajs/react";
import Notify from "../Notify";
import Cookies from "js-cookie";
import axios from "axios";

export default function Notifications({ auth, notifications, status }) {
    const [_notifications, setNotifications] = useState(notifications);
    const getNotifications = () => {
        axios
            .get(route("notification.get"))
            .then((res) => {
                const newNotifications = res.data.notifications;

                if (newNotifications.length !== _notifications.length) {
                    setNotifications(newNotifications);
                }
            })
            .catch((error) => {
                console.error("Error fetching notifications: ", error);
            });
    };

    useEffect(() => {
        getNotifications(); // Initial fetch

        const interval = setInterval(getNotifications, 3000); // Polling every 3 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, [_notifications]); // Adding _notifications in the dependency array to ensure updates

    return (
        <div className="notifications">
            <Main auth={auth} header={"Notifications"}>
                <Head title="Notifications" />
                <div className="notifications-holder">
                    {_notifications.length ? (
                        _notifications.map((notify) => (
                            <div key={notify.id}>
                                <div>
                                    <p>
                                        From:{" "}
                                        {notify.data.sender_data &&
                                            notify.data.sender_data.name}
                                    </p>
                                    <p
                                        onClick={() =>
                                            router.post(
                                                route(
                                                    "notification.read",
                                                    notify.id
                                                )
                                            )
                                        }
                                    >
                                        Title: {notify.data.title}
                                    </p>
                                    <p>Message: {notify.data.message}</p>
                                </div>

                                <div className="actions">
                                    <button
                                        className="danger"
                                        onClick={() => {
                                            router.delete(
                                                route(
                                                    "notification.destroy",
                                                    notify.id
                                                )
                                            );

                                            getNotifications();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>There is no notifications for you</p>
                    )}
                </div>
            </Main>
            {status.success ? <Notify message={status.success} /> : null}
        </div>
    );
}
