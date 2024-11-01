import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Main from "@/Pages/Main";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router, useForm } from "@inertiajs/react";
import { useRef } from "react";

function AddAdmin({ auth, admin }) {
    const { data, setData, post, errors } = useForm({
        name: admin.name || "",
        image_path: "",
        email: admin.email || "",
        role: admin.role || "",
        phone_number: admin.phone_number || "",
        _method: "PUT",
    });

    const imageRef = useRef();
    const formImage = useRef();
    const handleForm = (e) => {
        e.preventDefault();

        post(route("admins.update", admin.id));
    };

    return (
        <Main header="Admins" auth={auth}>
            <div className="dashboard-form">
                <h1>Edit Admin | {data.name}</h1>
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
                        name="email"
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
                    <InputLabel htmlFor="image" value={"Avatar"} />

                    <input
                        type="file"
                        ref={imageRef}
                        hidden
                        id="image"
                        onChange={(e) => {
                            setData("image_path", e.target.files[0]);
                            formImage.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <img
                        id="form-image"
                        src={`/storage/${admin.image_path}`}
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
                    <InputLabel htmlFor="role" value={"Role"} />

                    <select
                        name="role"
                        id="role"
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
                        <button className="flex-1 primary">Edit</button>
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
