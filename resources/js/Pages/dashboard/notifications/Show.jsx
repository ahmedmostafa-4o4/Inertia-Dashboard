import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Main from "../../Main";
import { Head, Link } from "@inertiajs/react";
import {
    faCheck,
    faCheckDouble,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import UserImage from "@/Components/UserImage";
import TextInput from "@/Components/TextInput";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function ShowNotification({
    auth,
    notification,
    sender_id,
    notifiable_id,
}) {
    const [notifications, setNotifications] = useState(notification); // Store notifications
    const [loading, setLoading] = useState(false); // Store notifications
    const messageRef = useRef();
    const messagesRef = useRef();

    const getNotifications = () => {
        axios
            .get(route("profile.chats"), {
                params: {
                    sender_id: sender_id,
                    notifiable_id: notifiable_id,
                },
            })
            .then((res) => {
                if (res.data.notifications.length > notifications.length) {
                    setLoading(false);
                    messagesRef.current.scrollTo({
                        top: messagesRef.current.scrollHeight,
                        behavior: "smooth",
                    });
                }
                setNotifications(res.data.notifications);

                // Update state with new notifications
            })
            .catch((error) => {
                console.error("Error fetching notifications: ", error);
            });
    };
    const sendMessage = (e) => {
        e.preventDefault();
        if (messageRef.current.value != "") {
            axios
                .post(route("profile.sendMessage"), {
                    users: [sender_id],
                    message: messageRef.current.value,
                })

                .catch((error) => {
                    console.error("Error Sending Message: ", error);
                });

            setLoading(true);
            messageRef.current.value = "";
        }
    };

    useEffect(() => {
        getNotifications(); // Initial fetch
        messagesRef.current.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "smooth",
        });

        const interval = setInterval(getNotifications, 3000); // Polling every 3 seconds
        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
        <div className="notification-page">
            <Main auth={auth} header={"Notifications"}>
                <Head title="Notifications" />
                <div className="title">
                    <h1>
                        {/* Sender Link */}
                        {notifications.length > 0 && (
                            <Link
                                className="text-sm hover:underline flex items-center gap-2"
                                href={route(
                                    "admins.show",
                                    JSON.parse(notifications[0].data)
                                        .sender_data.id
                                )}
                            >
                                <UserImage
                                    auth={auth}
                                    src={
                                        JSON.parse(notifications[0].data)
                                            .sender_data.image_path
                                    }
                                />
                                <div>
                                    <p>
                                        {
                                            JSON.parse(notifications[0].data)
                                                .sender_data.name
                                        }
                                    </p>
                                    <span className="text-xs text-slate-400">
                                        {
                                            JSON.parse(notifications[0].data)
                                                .sender_data.email
                                        }
                                    </span>
                                </div>
                            </Link>
                        )}
                    </h1>
                </div>
                <div className="chat-container">
                    <div className="messages" ref={messagesRef}>
                        {notifications &&
                            notifications.map((notify, index) => {
                                const data = JSON.parse(notify.data);
                                const prevNotify = notifications[index - 1];
                                const prevType = prevNotify
                                    ? prevNotify.type
                                    : null;

                                return (
                                    <div
                                        className={`message-holder ${
                                            notify.type === "sender"
                                                ? "sender"
                                                : "reciever"
                                        }`}
                                        key={index}
                                    >
                                        {/* Show user image if the type differs from the previous message */}
                                        {notify.type !== "sender" ? (
                                            <UserImage
                                                auth={auth}
                                                src={auth.user.image_path}
                                            />
                                        ) : (
                                            <UserImage
                                                auth={auth}
                                                src={
                                                    data.sender_data.image_path
                                                }
                                            />
                                        )}

                                        <div className="message">
                                            <div className="flex flex-col">
                                                {data.message}
                                                <span className="text-xs text-slate-300 flex items-center justify-between">
                                                    <p>
                                                        {dayjs(
                                                            notify.created_at
                                                        ).format("HH:MM:ss")}
                                                    </p>
                                                    <p>
                                                        {notify.type ===
                                                            "receiver" &&
                                                            (notify.read_at ? (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheckDouble
                                                                    }
                                                                />
                                                            ) : (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                />
                                                            ))}
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <form className="flex items-center " onSubmit={sendMessage}>
                        <TextInput
                            className="chat-input flex-1"
                            ref={messageRef}
                            placeHolder={"Type..."}
                        />
                        <button className="primary">
                            Send
                            {loading && (
                                <FontAwesomeIcon icon={faSpinner} spin />
                            )}
                        </button>
                    </form>
                </div>
            </Main>
        </div>
    );
}
