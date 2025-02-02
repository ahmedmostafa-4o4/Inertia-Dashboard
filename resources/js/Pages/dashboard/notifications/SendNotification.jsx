
import { router, useForm } from "@inertiajs/react";

export default function SendNotification({ auth, users }) {
    const { data, setData, post } = useForm({
        users: users,
        message: "",
    });
    const handleForm = (e) => {
        e.preventDefault();
        post(route("notification.send"));
    };

    return (
        <>
            <div className="dashboard-form">
                <h1>Send Notification</h1>
                <form onSubmit={handleForm} className="input-style">
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                    >
                        Message
                    </textarea>

                    <div className="flex justify-center align-middle gap-2">
                        <button className="flex-1 primary">Send</button>
                        <button
                            className="flex-1 danger"
                            onClick={(e) => {
                                e.preventDefault();
                                router.get(route("admins.index"));
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
SendNotification.header = "Send Notification";
