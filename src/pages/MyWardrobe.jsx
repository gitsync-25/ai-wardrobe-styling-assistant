import React, {
  useState,
  useEffect
} from "react";
import { supabase } from "../supabase";

function MyWardrobe() {

  const [images, setImages] =
  useState([]);

    const [uploading, setUploading] =
  useState(false);

  const [category, setCategory] =
  useState("Shirts");

  const [filter, setFilter] =
  useState("All");

useEffect(() => {

  fetchImages();

}, []);

const fetchImages = async () => {

  const {
    data,
    error
  } = await supabase
    .from("wardrobe_items")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {

    console.log(error.message);

    return;
  }

  if (data) {

    console.log(data);

const formattedImages =
  data.map((item) => ({

   url: item.image_url,

path: item.image_path,

category: item.category,

  }));

console.log(formattedImages);

setImages(formattedImages);
  }
};


 const handleImageChange = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  setUploading(true);

  const fileName =
    `${Date.now()}-${file.name}`;

  const { error } =
    await supabase.storage
      .from("wardrobe-images")
      .upload(fileName, file);

  if (error) {

    alert(error.message);

    setUploading(false);

    return;
  }

  const {
    data: publicUrlData
  } = supabase.storage
      .from("wardrobe-images")
      .getPublicUrl(fileName);

     const { error: dbError } =
  await supabase
    .from("wardrobe_items")
    .insert([
      {
        image_url:
          publicUrlData.publicUrl,

        image_path:
          fileName,
          category: category,
      }
    ]);

if (dbError) {

  console.log(dbError);

  alert(dbError.message);

  return;
}

  setImages((prev) => [

  ...prev,

  {
    url: publicUrlData.publicUrl,

    path: fileName,

    category: category,
  }
]);

  setUploading(false);

  alert("Image uploaded successfully 🔥");
};

const handleDelete = async (path) => {

  const { error: storageError } =
    await supabase.storage
      .from("wardrobe-images")
      .remove([path]);

  if (storageError) {

    alert(storageError.message);

    return;
  }

  const { error: dbError } =
    await supabase
      .from("wardrobe_items")
      .delete()
      .eq("image_path", path);

  if (dbError) {

    alert(dbError.message);

    return;
  }

  setImages((prev) =>

    prev.filter(
      (img) => img.path !== path
    )
  );
};

  return (

    <div className="dashboard-content">

      <h1>
        My Wardrobe 👕
      </h1>

      <p>
        Upload and manage your clothes.
      </p>

            <div className="filter-buttons">

  <button
    onClick={() => setFilter("All")}
  >
    All
  </button>

  <button
    onClick={() => setFilter("Shirts")}
  >
    Shirts
  </button>

  <button
    onClick={() => setFilter("Pants")}
  >
    Pants
  </button>

  <button
    onClick={() => setFilter("Shoes")}
  >
    Shoes
  </button>

  <button
    onClick={() => setFilter("Hoodies")}
  >
    Hoodies
  </button>

</div>

      <div className="upload-box">

        <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
  className="category-select"
>

  <option>
    Shirts
  </option>

  <option>
    Pants
  </option>

  <option>
    Shoes
  </option>

  <option>
    Hoodies
  </option>

  <option>
    Accessories
  </option>

</select>

        <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

{
  uploading && (

    <p>
      Uploading...
    </p>
  )
}

        <div className="wardrobe-grid">

  {
    images
  .filter((img) =>

    filter === "All"
      ? true
      : img.category === filter
  )
  .map((img, index) => (

      <div
        key={index}
        className="image-card"
      >

        <img
          src={img.url}
          alt="wardrobe"
          className="preview-image"
        />

          <p className="image-category">
  {img.category}
</p>

        <button
          className="delete-btn"
          onClick={() =>
            handleDelete(img.path)
          }
        >
          Delete
        </button>

      </div>
    ))
  }

</div>

      </div>

    </div>
  );
}

export default MyWardrobe;