// _rfc
import { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { formatBytes } from "helpers/utils";

export default function ImageUpload({ eventId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", eventId);
    formData.append("field", "image");

    // AIRTABLE
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (res.ok) {
      imageUploaded();
    }
  };

  // [FormData]
  // The FormData interface provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method.

  const handleFileChange = (e) => {
    // console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image ({eventId})</h1>
      <h3>
        {image && (
          <span>
            {image.name} ({formatBytes(image.size, 1)})
          </span>
        )}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
}
