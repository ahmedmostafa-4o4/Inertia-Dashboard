import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Head, router, useForm } from "@inertiajs/react";

function AddCategory() {
    const {  setData, post, errors } = useForm({
        title: "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        post(route("categories.store"));
    };

    return (
        <>
            <Head title="Add Category" />
            <div className="dashboard-form">
                <form onSubmit={handleForm} className="input-style">
                    <InputLabel htmlFor="title" value={"Category Title"} />

                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Category Title"
                        onChange={(e) => setData("title", e.target.value)}
                    />

                    <InputError message={errors.title} />
                    <div className="flex justify-center align-middle gap-2">
                        <button className="primary flex-1">Add</button>
                        <button
                            className="danger"
                            onClick={() =>
                                router.get(route("categories.index"))
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

AddCategory.header = "Add Category";

export default AddCategory;
