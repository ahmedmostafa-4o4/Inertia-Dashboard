import { useEffect, useState } from "react";
import Main from "../../Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Head, Link, router } from "@inertiajs/react";
import Notify from "../Notify";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Swal from "sweetalert2";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);

export default function Notifications({ auth, notifications, status }) {
    const updatedNotifications = (notifications) =>
        notifications.map((notification) => {
            const createdAt = dayjs(notification.created_at);
            const now = dayjs();

            // Check if the notification was created today
            const formattedDate = createdAt.isSame(now, "day")
                ? createdAt.fromNow() // Same day, show "time ago"
                : createdAt.format("MMMM D, YYYY"); // Not the same day, show date

            return {
                ...notification,
                created_at: formattedDate,
            };
        });
    const [_notifications, setNotifications] = useState(
        updatedNotifications(notifications)
    );

    const getNotifications = () => {
        axios
            .get(route("notification.get"))
            .then((res) => {
                const newNotifications = res.data.notifications;
                if (newNotifications.length !== _notifications.length) {
                    setNotifications(updatedNotifications(newNotifications));
                }
            })
            .catch((error) => {
                console.error("Error fetching notifications: ", error);
            });
    };

    const truncateMessage = (message, length) => {
        return message.length > length
            ? `${message.slice(0, length)}...`
            : message;
    };

    const alertPopup = (action = () => {}) => {
        Swal.fire({
            title: "Are You Sure?",
            showCancelButton: true,
            confirmButtonText: "Sure",
            showClass: {
                popup: "animate__animated animate__backInDown", // animation on show
            },
            hideClass: {
                popup: "animate__animated animate__backOutDown", // animation on hide
            },
        }).then((result) => {
            if (result.isConfirmed) {
                action();
                setSelectedRows([]);
                // You can handle the textarea value here
            }
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
                <div className="title">
                    <div className="actions">
                        <button
                            className="danger"
                            onClick={() =>
                                alertPopup(() =>
                                    router.delete(
                                        route("notification.destroyAll")
                                    )
                                )
                            }
                        >
                            {" "}
                            <FontAwesomeIcon icon={faTrashCan} />
                            Delete all
                        </button>
                    </div>
                </div>
                <div className="notifications-holder">
                    {_notifications.length ? (
                        _notifications.map((notify) => (
                            <div
                                key={notify.id}
                                className={
                                    notify.read_at !== null
                                        ? `notification read`
                                        : `notification`
                                }
                                onClick={() => {
                                    router.post(
                                        route("notification.read", notify.id)
                                    );
                                }}
                            >
                                <div>
                                    <p className="subject">
                                        {notify.data.title}
                                    </p>
                                    <p className="message">
                                        {truncateMessage(
                                            notify.data.message,
                                            150
                                        )}
                                    </p>
                                    <div>
                                        <Link
                                            href={route(
                                                "admins.show",
                                                notify.data.sender_data.id
                                            )}
                                            className="hover:underline"
                                        >
                                            From:{" "}
                                            {notify.data.sender_data &&
                                                notify.data.sender_data.name}
                                        </Link>
                                        <p className="message">
                                            {notify.created_at}
                                        </p>
                                    </div>
                                </div>

                                <div className="actions">
                                    <button
                                        className="danger"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alertPopup(() =>
                                                router.delete(
                                                    route(
                                                        "notification.destroy",
                                                        notify.id
                                                    )
                                                )
                                            );
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
