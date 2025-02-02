import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { router, useForm } from "@inertiajs/react";

function EditCategory({ category }) {
    const { data, setData, put, errors } = useForm({
        title: category.title || "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id));
    };

    return (
        <>
            <div className="dashboard-form">
                <h1>Edit Category | {data.title}</h1>
                <form onSubmit={handleForm} className="input-style">
                    <InputLabel htmlFor="title" value={"Category Title"} />

                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} className="error" />

                    <div className="flex justify-center align-middle gap-2">
                        <button className="flex-1 primary">Edit</button>
                        <button
                            className="danger"
                            onClick={(e) => {
                                e.preventDefault();
                                router.get(route("categories.index"));
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
EditCategory.header = "Edit Category";

export default EditCategory;
