import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { faImage, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router, useForm } from "@inertiajs/react";
import { Box, Button, Chip, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { SketchPicker } from "react-color";

function EditProduct({ categories, product }) {
    const {colors, sizes} = JSON.parse(product.options);
    const [currentColor, setCurrentColor] = useState('#000000'); // Default black
    const [colorList, setColorList] = useState(colors);
    const [selectedSizes, setSelectedSizes] = useState(sizes);
    const [customSize, setCustomSize] = useState('');
    const { data, setData, post, errors } = useForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        offer: product.offer || "",
        options:{colors, sizes},
        images: { image1: "", image2: "", image3: "", image4: "" },
        category_id: product.category_id || "",
        _method: "PUT",
    });
    const images = JSON.parse(product.images);
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
        post(route("products.update", product.id));
    };

       
  
    const addColor = () => {
        if (!colorList.includes(currentColor)) {
          setColorList([...colorList, currentColor]);
        }
      };
    
      const removeColor = (color) => {
        setColorList(colorList.filter((c) => c !== color));
  
      };
  
     
    
      const addSize = (size) => {
        if (size && !selectedSizes.includes(size)) {
          setSelectedSizes([...selectedSizes, size]);
  
        }
        setCustomSize(''); // Reset custom size input
  
      };
    
      const removeSize = (size) => {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      };
    

    return (
        <>
            <div className="dashboard-form">
                <form onSubmit={handleForm} className="input-style">
                    <InputLabel value={"Product Title"} />
                    <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <InputError message={errors.title} />
                    <InputLabel value={"Description"} />

                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                    ></textarea>
                    <InputError message={errors.description} />

                    <InputLabel value={"Price"} />

                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                    />
                    <InputError message={errors.price} />

                    <InputLabel value={"Stock"} />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={data.stock}
                        min={1}
                        onChange={(e) => setData("stock", e.target.value)}
                    />

                    <InputError message={errors.stock} />

                    <InputLabel value={"Offer"} />

                    <input
                        type="text"
                        name="offer"
                        placeholder="Offer"
                        value={data.offer}
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
                            <img
                                src={
                                    images.image1 && `/storage/${images.image1}`
                                }
                                alt=""
                                ref={formImage1}
                            />
                            {data.images.image1 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image1: "",
                                        });
                                        formImage1.current.src =
                                            images.image1 &&
                                            `/storage/${images.image1}`;
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
                            <img
                                src={
                                    images.image2 && `/storage/${images.image2}`
                                }
                                alt=""
                                ref={formImage2}
                            />
                            {data.images.image2 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image2: "",
                                        });
                                        formImage2.current.src =
                                            images.image2 &&
                                            `/storage/${images.image2}`;
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
                            <img
                                src={
                                    images.image3 && `/storage/${images.image3}`
                                }
                                alt=""
                                ref={formImage3}
                            />
                            {data.images.image3 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image3: "",
                                        });
                                        formImage3.current.src =
                                            images.image3 &&
                                            `/storage/${images.image3}`;
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
                            <img
                                src={
                                    images.image4 && `/storage/${images.image4}`
                                }
                                alt=""
                                ref={formImage4}
                            />
                            {data.images.image4 && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setData("images", {
                                            ...data.images,
                                            image4: "",
                                        });
                                        formImage4.current.src =
                                            images.image4 &&
                                            `/storage/${images.image4}`;
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
                        value={data.category_id}
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

                    
                    
      <div className="flex justify-between flex-wrap gap-2">
      <SketchPicker
        color={currentColor}
        onChangeComplete={(color) => setCurrentColor(color.hex)}
        className="min-w-52"
      />
      <div className="flex-1 min-w-52">
        {colorList.map((color, index) => (
          <Chip
            key={index}
            label={color}
            style={{ backgroundColor: color, color: '#fff', margin: '5px' }}
            onDelete={() => removeColor(color)}
          />
        ))}
        
      </div>
     
      
    </div>  <Button variant="contained" onClick={addColor} style={{ margin: '10px 0' }}>
        Add Color
      </Button>

      <Box>

      {/* Manual Input for Custom Sizes */}
      <div className="flex gap-2 flex-wrap">
      <TextField
        value={customSize}
        onChange={(e) => setCustomSize(e.target.value)}
        onKeyDown={(e) => { 
          if (e.key === 'Enter') {
            addSize(customSize);
            e.preventDefault();
          }
        }}
        style={{ marginBottom: '10px' }}
        placeholder="Custom Size"
        className="flex-1"
      />

      <Button
        variant="contained"
        onClick={() => addSize(customSize)}
        style={{ marginBottom: '10px' }}
      >
        Add Custom Size
      </Button>
</div>
      {/* Display Selected Sizes */}
      <Box>
        {selectedSizes.map((size, index) => (
          <Chip
            key={index}
            label={size}
            onDelete={() => removeSize(size)}
            style={{ margin: '5px' , color:"#ccc"}}
          />
        ))}
      </Box>

     
    </Box>

                    <div className="flex justify-center align-middle gap-2">
                        <button className="primary flex-1" onClick={() => {setData('options', {colors: colorList, sizes: selectedSizes})}}>Edit</button>
                        <button
                            className="danger"
                            onClick={() => router.get(route("products.index"))}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

EditProduct.header = "Edit Product";

export default EditProduct;
