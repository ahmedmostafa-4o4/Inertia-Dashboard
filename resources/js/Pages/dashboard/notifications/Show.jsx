import Main from "../../Main";
import { Head } from "@inertiajs/react";

export default function ShowNotification({ auth, notification, status }) {
    return (
        <div className="notifications">
            <Main auth={auth} header={"Notifications"}>
                <Head title="Notifications" />
                <div className="notifications-holder">
                    {notification.data.message}
                </div>
            </Main>
        </div>
    );
}
