import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Main from "@/Pages/Main";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router, useForm } from "@inertiajs/react";
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
    const formImage = useRef();
    const handleForm = (e) => {
        e.preventDefault();
        post(route("admins.store"));
    };

    return (
        <Main header="Admins" auth={auth}>
            <Head title="Add Admin" />
            <div className="dashboard-form">
                <form onSubmit={handleForm} className="input-style">
                    <InputLabel htmlFor="name" value={"Full Name"} />
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="error" />
                    <InputLabel htmlFor="email" value={"Email"} />

                    <input
                        id="email"
                        type="email"
                        name="name"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="error" />
                    <InputLabel htmlFor="phone_number" value={"Phone Number"} />
                    <input
                        id="phone_number"
                        type="text"
                        name="phone_number"
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
                        onChange={(e) => {
                            setData("image_path", e.target.files[0]);
                            formImage.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <InputLabel htmlFor="image" value={"Avatar"} />

                    <img
                        id="form-image"
                        src="/images/default-user.jpg"
                        alt=""
                        ref={formImage}
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
                    <InputLabel htmlFor="password" value={"Password"} />

                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="error" />
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={"Confirm Password"}
                    />

                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
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
                    <InputLabel htmlFor="role" value={"Role"} />

                    <select
                        id="role"
                        name="role"
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

                    <div className="flex justify-center align-middle gap-2">
                        <button className="flex-1 primary">Add</button>
                        <button
                            className="danger"
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

export default AddAdmin;
