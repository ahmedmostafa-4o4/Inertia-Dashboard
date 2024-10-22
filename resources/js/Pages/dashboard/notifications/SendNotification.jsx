import InputError from "@/Components/InputError";
import Main from "@/Pages/Main";

import { router, useForm } from "@inertiajs/react";

export default function SendNotification({ auth, users }) {
    const { data, setData, post, errors } = useForm({
        users: users,
        title: "",
        message: "",
    });
    const handleForm = (e) => {
        e.preventDefault();
        post(route("notification.send"));
    };

    return (
        <Main header="Notifications" auth={auth}>
            <div className="dashboard-form">
                <h1>Send Notification</h1>
                <form onSubmit={handleForm} className="input-style">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} className="error" />

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
        </Main>
    );
}
