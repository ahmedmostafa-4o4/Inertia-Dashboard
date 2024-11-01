import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Main from "@/Pages/Main";
import { faImage, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router, useForm } from "@inertiajs/react";
import { useRef } from "react";

function AddProduct({ auth, categories }) {
    const { data, setData, post, errors } = useForm({
        title: "",
        description: "",
        price: "",
        stock: "",
        offer: "",
        images: { image1: "", image2: "", image3: "", image4: "" },
        category_id: "",
    });
    const image1Ref = useRef();
    const image2Ref = useRef();
    const image3Ref = useRef();
    const image4Ref = useRef();
    const formImage1 = useRef();
    const formImage2 = useRef();
    const formImage3 = useRef();
    const formImage4 = useRef();
    const handleForm = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("products.store"));
        console.log(errors);
    };

    return (
        <Main header="Add Product" auth={auth}>
            <div className="dashboard-form">
                <form onSubmit={handleForm} className="input-style">
                    <InputLabel value={"Product Title"} />
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} />
                    <InputLabel value={"Description"} />

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={(e) => setData("description", e.target.value)}
                    />
                    <InputError message={errors.description} />

                    <InputLabel value={"Price"} />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={(e) => setData("price", e.target.value)}
                    />
                    <InputError message={errors.price} />

                    <InputLabel value={"Stock"} />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        min={1}
                        onChange={(e) => setData("stock", e.target.value)}
                    />

                    <InputError message={errors.stock} />

                    <InputLabel value={"Offer"} />

                    <input
                        type="text"
                        name="offer"
                        placeholder="Offer"
                        onChange={(e) => setData("offer", e.target.value)}
                    />
                    <InputError message={errors.offer} />

                    <input
                        type="file"
                        id="image-1"
                        ref={image1Ref}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setData("images", {
                                ...data.images,
                                image1: e.target.files[0],
                            });

                            formImage1.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <input
                        type="file"
                        id="image-2"
                        ref={image2Ref}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setData("images", {
                                ...data.images,
                                image2: e.target.files[0],
                            });
                            formImage2.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <input
                        type="file"
                        id="image-3"
                        ref={image3Ref}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setData("images", {
                                ...data.images,
                                image3: e.target.files[0],
                            });
                            formImage3.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <input
                        type="file"
                        id="image-4"
                        ref={image4Ref}
                        style={{ display: "none" }}
                        onChange={(e) => {
                            setData("images", {
                                ...data.images,
                                image4: e.target.files[0],
                            });
                            formImage4.current.src = URL.createObjectURL(
                                e.target.files[0]
                            );
                        }}
                    />
                    <InputLabel value={"Product Images"} />

                    <div className="product-images">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                image1Ref.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faImage} />
                            <img src="" alt="" ref={formImage1} />
                            {data.images.image1 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image1: "",
                                        });
                                        formImage1.current.src = "";
                                        image1Ref.current.src = "";
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        className="!text-red-600"
                                    />
                                </button>
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                image2Ref.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faImage} />
                            <img src="" alt="" ref={formImage2} />
                            {data.images.image2 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image2: "",
                                        });
                                        formImage2.current.src = "";
                                        image2Ref.current.src = "";
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        className="!text-red-600"
                                    />
                                </button>
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                image3Ref.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faImage} />
                            <img src="" alt="" ref={formImage3} />
                            {data.images.image3 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image3: "",
                                        });
                                        formImage3.current.src = "";
                                        image3Ref.current.src = "";
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        className="!text-red-600"
                                    />
                                </button>
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                image4Ref.current.click();
                            }}
                        >
                            <FontAwesomeIcon icon={faImage} />
                            <img src="" alt="" ref={formImage4} />
                            {data.images.image4 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image4: "",
                                        });
                                        formImage4.current.src = "";
                                        image4Ref.current.src = "";
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faXmarkCircle}
                                        className="!text-red-600"
                                    />
                                </button>
                            )}
                        </button>
                    </div>
                    <InputError message={errors["images.image1"]} />
                    <InputError message={errors["images.image2"]} />
                    <InputError message={errors["images.image3"]} />
                    <InputError message={errors["images.image4"]} />

                    <InputLabel value={"Select Category"} />

                    <select
                        onChange={(e) => setData("category_id", e.target.value)}
                    >
                        <option value="" key="">
                            Select Category
                        </option>
                        {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} />

                    <div className="flex justify-center align-middle gap-2">
                        <button className="primary flex-1">Add</button>
                        <button
                            className="danger"
                            onClick={() => router.get(route("products.index"))}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    );
}

export default AddProduct;
