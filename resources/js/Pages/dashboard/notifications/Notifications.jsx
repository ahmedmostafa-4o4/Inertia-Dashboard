import { useEffect, useState } from "react";
import Main from "../../Main";
import { Head, Link, router } from "@inertiajs/react";
import Notify from "../Notify";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import UserImage from "@/Components/UserImage";

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
                setNotifications(updatedNotifications(newNotifications));
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

    useEffect(() => {
        getNotifications(); // Initial fetch

        const interval = setInterval(getNotifications, 3000); // Polling every 3 seconds

        return () => clearInterval(interval); // Clean up on component unmount
    }, [_notifications]); // Adding _notifications in the dependency array to ensure updates

    return (
        <div className="notifications">
            <Main auth={auth} header={"Notifications"}>
                <Head title="Notifications" />
                <div className="title"></div>
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
                                    router.get(
                                        route("notification.read", {
                                            notification: notify.id,
                                            id: notify.data.sender_data.id,
                                            notifiable_id: notify.notifiable_id,
                                        })
                                    );
                                }}
                            >
                                <div>
                                    {" "}
                                    <Link
                                        onClick={(e) => e.stopPropagation()}
                                        href={route(
                                            "admins.show",
                                            notify.data.sender_data.id
                                        )}
                                        className="hover:underline flex items-center gap-2 mb-2"
                                    >
                                        <UserImage
                                            auth={auth}
                                            src={
                                                notify.data.sender_data
                                                    .image_path
                                            }
                                        />
                                        <div>
                                            <p className="text-sm">
                                                {notify.data.sender_data &&
                                                    notify.data.sender_data
                                                        .name}
                                            </p>
                                            <p className="text-xs text-slate-300">
                                                {notify.data.sender_data &&
                                                    notify.data.sender_data
                                                        .email}
                                            </p>
                                        </div>
                                    </Link>
                                    <div>
                                        <p className="message">
                                            {truncateMessage(
                                                notify.data.message,
                                                150
                                            )}
                                        </p>
                                        <div>
                                            <p className="message">
                                                {notify.created_at}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>There is no messages </p>
                    )}
                </div>
            </Main>
            {status.success ? <Notify message={status.success} /> : null}
        </div>
    );
}
