import Main from "@/Pages/Main";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function AddAdmin({ auth }) {
    const imageRef = useRef();
    const handleForm = (e) => {
        e.preventDefault();
    };

    return (
        <Main header="Add User" auth={auth}>
            <div className="dashboard-form">
                <h1>New User</h1>
                <form onSubmit={handleForm}>
                    <input type="text" name="name" placeholder="Full Name" />
                    <input type="email" name="email" placeholder="Email" />
                    <input
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                    />
                    <input type="file" id="image" ref={imageRef} hidden />
                    <button
                        onClick={() => imageRef.current.click()}
                        className="avatar-btn"
                    >
                        <FontAwesomeIcon icon={faImage} />
                        Avatar
                    </button>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                    />
                    <button>Add</button>
                </form>
            </div>
        </Main>
    );
}

export default AddAdmin;
