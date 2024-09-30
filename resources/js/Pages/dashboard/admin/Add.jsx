import InputError from "@/Components/InputError";
import Main from "@/Pages/Main";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

function AddAdmin({ auth }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        image_path: "",
        email: "",
        password: "",
        role: "",
        phone_number: "",
        password_confirmation: "",
    });

    const imageRef = useRef();
    const handleForm = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("admins.store"));
    };

    return (
        <Main header="Add Admin" auth={auth}>
            <div className="dashboard-form">
                <h1>New Admin</h1>
                <form onSubmit={handleForm}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="error" />
                    <input
                        type="email"
                        name="name"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="error" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Phone Number"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData("phone_number", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.phone_number}
                        className="error"
                    />

                    <input
                        type="file"
                        id="image"
                        ref={imageRef}
                        hidden
                        onChange={(e) =>
                            setData("image_path", e.target.files[0])
                        }
                    />
                    <button
                        onClick={(e) => {
                            imageRef.current.click();
                            e.preventDefault();
                        }}
                        className="avatar-btn"
                    >
                        <FontAwesomeIcon icon={faImage} />
                        Avatar
                    </button>
                    <InputError message={errors.image_path} className="error" />

                    <input
                        type="password"
                        name="name"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="error" />

                    <input
                        type="password"
                        name="name"
                        placeholder="Confirm Password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="error"
                    />

                    <select
                        onChange={(e) => setData("role", e.target.value)}
                        value={data.role || ""}
                    >
                        <option value="" key="">
                            Select Role
                        </option>
                        <option value="sales" key="sales">
                            Sales
                        </option>
                        <option value="marketing" key="marketing">
                            Marketing
                        </option>
                        <option value="owner" key="owner">
                            Owner
                        </option>
                    </select>
                    <InputError message={errors.role} className="error" />

                    <button>Add</button>
                </form>
            </div>
        </Main>
    );
}

export default AddAdmin;
