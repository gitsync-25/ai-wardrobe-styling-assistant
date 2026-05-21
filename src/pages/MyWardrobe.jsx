import React, { useState } from "react";
import { supabase } from "../supabase";

function MyWardrobe() {

  const [images, setImages] =
  useState([]);

    const [uploading, setUploading] =
  useState(false);

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

  setImages((prev) => [

  ...prev,

  publicUrlData.publicUrl
]);

  setUploading(false);

  alert("Image uploaded successfully 🔥");
};

  return (

    <div className="dashboard-content">

      <h1>
        My Wardrobe 👕
      </h1>

      <p>
        Upload and manage your clothes.
      </p>

      <div className="upload-box">

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
    images.map((img, index) => (

      <img
        key={index}
        src={img}
        alt="wardrobe"
        className="preview-image"
      />
    ))
  }

</div>

      </div>

    </div>
  );
}

export default MyWardrobe;