import Sidebar from "./dashboard/Sidebar";
import Nav from "./dashboard/Nav";
import Notify from "./dashboard/Notify";
import { useEffect, useState } from "react";
import ActiveUsers from "./dashboard/admin/ActiveUsers";
export default function Main({ auth, children, header }) {
    const [isVisible, setIsVisible] = useState(false);
    const [_notifications, setNotifications] = useState(
        auth.user.notifications
    );
    const getNotifications = () => {
        axios
            .get(route("notification.get"))
            .then((res) => {
                const newNotifications = res.data.notifications;

                if (newNotifications.length !== _notifications.length) {
                    setNotifications(newNotifications);
                }
                if (newNotifications.length > _notifications.length) {
                    setIsVisible(true);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 3500);
                }
            })
            .catch((error) => {
                console.error("Error fetching notifications: ", error);
            });
    };

    useEffect(() => {
        getNotifications(); // Initial fetch

        const interval = setInterval(getNotifications, 3000); // Polling every 3 seconds

        return () => {
            clearInterval(interval);
        }; // Clean up on component unmount
    }, [_notifications]); // Adding _notifications in the dependency array to ensure updates

    return (
        <div className="dashboard-body">
            <div className="sidebar-contain"></div>
            <Sidebar auth={auth} />
            <ActiveUsers />
            <div className="dashboard">
                <Nav
                    header={header}
                    auth={auth}
                    unReadnotificationsCount={_notifications.length}
                />
                {children}
            </div>
            {/* {isVisible && (
                <Notify
                    title="New Message"
                    message="You have a new message from John Doe!"
                    onClose={() => setIsVisible(false)}
                />
            )} */}
            {isVisible ? (
                <Notify message={"You Have New Notification !"} />
            ) : null}
        </div>
    );
}
