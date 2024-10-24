import axios from "axios";
import { useEffect, useState } from "react";
import Main from "../Main";

export default function Test({ auth }) {
    const [usersStatus, setUsersStatus] = useState([]);

    // Function to fetch all users' activity status
    const fetchUsersActivity = () => {
        axios.get(route("admin.users.activity")).then((response) => {
            setUsersStatus(response.data);
        });
    };

    useEffect(() => {
        // Fetch users' activity on component mount
        fetchUsersActivity();

        // Optionally, check every 5 seconds to update the statuses
        const interval = setInterval(fetchUsersActivity, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <Main auth={auth}>
            <div>
                <h2>Users Activity Status</h2>
                <ul>
                    {usersStatus.map((user, index) => (
                        <li key={index} className="text-white">
                            User {user.user_id}: {user.status} : Last Activity :{" "}
                            {user.last_activity}
                        </li>
                    ))}
                </ul>
            </div>
        </Main>
    );
}
