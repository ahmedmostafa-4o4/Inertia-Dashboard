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
        <Main header="Add Admin" auth={auth}>
            <div className="dashboard-form">
                <h1>New Admin</h1>
                <form onSubmit={handleForm}>
                    <input type="text" name="name" placeholder="Full Name" />
                    <input type="email" name="name" placeholder="Email" />
                    <input type="text" name="name" placeholder="Phone Number" />
                    <input type="file" id="image" ref={imageRef} hidden />
                    <button
                        onClick={() => imageRef.current.click()}
                        className="avatar-btn"
                    >
                        <FontAwesomeIcon icon={faImage} />
                        Avatar
                    </button>
                    <input type="password" name="name" placeholder="Password" />
                    <input
                        type="password"
                        name="name"
                        placeholder="Confirm Password"
                    />
                    <select>
                        <option value="role" key="">
                            Role
                        </option>
                        <option value="role" key="">
                            Sales
                        </option>
                        <option value="role" key="">
                            Marketing
                        </option>
                        <option value="role" key="">
                            Owner
                        </option>
                    </select>
                    <button>Add</button>
                </form>
            </div>
        </Main>
    );
}

export default AddAdmin;
