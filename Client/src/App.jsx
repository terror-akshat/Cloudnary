import React from "react";
import axios from "axios";

const App = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!preview) return;
    uploadImage(preview);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      const response = await axios.post("http://localhost:3000/api/upload", {
        data: base64EncodedImage,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input type="file" onChange={handleOnChange}/>
        <button type="submit"> Submit</button>
      </form>
      {preview && (
        <div>
          <img src={preview} alt="image" style={{ height: "100px" }} />
        </div>
      )}
    </>
  );
};

export default App;
