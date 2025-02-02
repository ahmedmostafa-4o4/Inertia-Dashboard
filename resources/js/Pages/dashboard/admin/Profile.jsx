import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import {
    faBell,
    faCameraRetro,
    faRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
import Notify from "../Notify";

export default function Profile({ auth, status }) {
    const { data, setData, post, errors, reset } = useForm({
        name: auth.user.name || "",
        email: auth.user.email || "",
        image_path: "",
        phone_number: auth.user.phone_number || "",
        role: auth.user.role || "",
        _method: "PUT",
    });

    const [cpOpen, setCpOpen] = useState(false);
    const [daOpen, setDaOpen] = useState(false);

    const imageRef = useRef();
    const formImage = useRef();
    const passwordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const deleteAccountPasswordRef = useRef();
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("profile.update"));
    };

    const onSubmitPassword = (e) => {
        e.preventDefault();
        const passData = {
            current_password: passwordRef.current.value,
            password: newPasswordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
        };

        router.put(route("admin.change_password"), passData, {
            onSuccess: () => {
                reset(); // Optionally reset the form
                setOpen(false); // Close the change password form
            },
            onError: (error) => {
                errors.current_password = error.current_password;
                errors.password = error.password;
            },
        });
    };
    const onSubmitDeleteAccount = (e) => {
        e.preventDefault();
        router.post(route("profile.delete"), {
            password: deleteAccountPasswordRef.current.value,
        });
    };
    return (
        <div className="my-profile">
            <>
                <Head title="Profile" />
                <div className="title">
                    <h1>{auth.user.name}'s Profile</h1>
                    <div className="actions">
                        <button
                            className="danger"
                            onClick={() => router.post(route("admin.logout"))}
                        >
                            {" "}
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            Logout
                        </button>
                    </div>
                </div>
                <h1 className="profile-title primary">Personal Information</h1>
                <div className="data">
                    <form onSubmit={onSubmit} className="input-style">
                        <div>
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
                                style={{ display: "none" }}
                            />

                            <InputLabel value={"Name"} htmlFor={"name"} />
                            <TextInput
                                name={"name"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="error"
                            />
                        </div>
                        <div>
                            <InputLabel value={"Email"} htmlFor={"email"} />
                            <TextInput
                                name={"email"}
                                type={"email"}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="error"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={"Phone Number"}
                                htmlFor={"phone_number"}
                            />
                            <TextInput
                                name={"phone_number"}
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone_number}
                                className="error"
                            />
                        </div>
                        <div>
                            <InputLabel value={"Role"} htmlFor={"role"} />
                            <select
                                name="role"
                                id="role"
                                value={data.role}
                                disabled={
                                    auth.user.role !== "owner" ? true : false
                                }
                                className="disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="" key="">
                                    Select Role
                                </option>
                                <option value="marketing" key="marketing">
                                    Marketing
                                </option>
                                <option value="sales" key="sales">
                                    Sales
                                </option>
                                <option value="owner" key="owner">
                                    Owner
                                </option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="error"
                            />
                        </div>
                        <div className="flex gap-1">
                            <button
                                className={
                                    "primary disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
                                }
                                disabled={
                                    data.name === auth.user.name &&
                                    data.email === auth.user.email &&
                                    !data.image_path &&
                                    data.phone_number ===
                                        auth.user.phone_number &&
                                    data.role === auth.user.role
                                }
                            >
                                Apply
                            </button>
                            <button
                                className={
                                    " flex-1 danger disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed"
                                }
                                disabled={
                                    data.name === auth.user.name &&
                                    data.email === auth.user.email &&
                                    !data.image_path &&
                                    data.phone_number ===
                                        auth.user.phone_number &&
                                    data.role === auth.user.role
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    formImage.current.src = `/storage/${auth.user.image_path}`;

                                    reset();
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                    <div className="user-image">
                        <img
                            src={`/storage/${auth.user.image_path}`}
                            alt=""
                            id="form-image"
                            ref={formImage}
                        />
                        <button
                            className="image-btn"
                            onClick={(e) => {
                                imageRef.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faCameraRetro} />
                            <InputError
                                message={errors.image_path}
                                className="error"
                            />
                        </button>
                    </div>
                </div>

                <div className="change-password">
                    {!cpOpen ? (
                        <>
                            <p>Change password</p>
                            <button
                                className="primary"
                                onClick={() => setCpOpen(true)}
                            >
                                Change
                            </button>
                        </>
                    ) : (
                        <>
                            <p>Change password</p>

                            <form
                                className="input-style"
                                onSubmit={onSubmitPassword}
                            >
                                <div>
                                    <InputLabel value={"Current Password"} />
                                    <TextInput
                                        type="password"
                                        name={"password"}
                                        ref={passwordRef}
                                    />
                                    <InputError
                                        message={errors.current_password}
                                    />
                                </div>
                                <div>
                                    <InputLabel value={"New Password"} />
                                    <TextInput
                                        type="password"
                                        name={"password"}
                                        ref={newPasswordRef}
                                    />
                                    <InputError message={errors.password} />
                                </div>
                                <div>
                                    <InputLabel value={"Confirm Password"} />
                                    <TextInput
                                        type="password"
                                        name={"password"}
                                        ref={confirmPasswordRef}
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                                <div className="flex mt-5 items-center gap-2">
                                    <button className="primary">Change</button>{" "}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCpOpen(false);
                                        }}
                                        className="danger"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <div className="delete-account">
                    <p>Delete Your Account</p>
                    {!daOpen ? (
                        <button
                            className="danger"
                            onClick={(e) => {
                                e.preventDefault();
                                setDaOpen(true);
                            }}
                        >
                            Delete
                        </button>
                    ) : (
                        <form
                            className="input-style"
                            onSubmit={onSubmitDeleteAccount}
                        >
                            <div>
                                <InputLabel value={"Enter Your Password"} />
                                <TextInput
                                    type="password"
                                    name={"password"}
                                    ref={deleteAccountPasswordRef}
                                />
                                <InputError message={errors.current_password} />
                            </div>
                            <div className="flex mt-5 items-center gap-2">
                                <button className="danger">Delete</button>{" "}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDaOpen(false);
                                    }}
                                    className="primary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </>
            {status ? <Notify message={status} /> : null}
        </div>
    );
}
Profile.header = "Profile";
