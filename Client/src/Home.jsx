import React, { useEffect, useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import {  Cloudinary } from "@cloudinary/url-gen";

const cid = new Cloudinary({
  cloud: {
    cloudName: 'df7zyzkbe',
  },
});

const Home = () => {
  const [image, setImage] = useState(null);
  const loadImage = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/image");
      const data = await res.json();
      console.log(data);
      setImage(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadImage();
  }, []);

  return (
    <>
      <div>Home</div>
      {image &&
        image.map((id) => {
          const myImage = cid.image(id);
          return (
            <div key={id}>
              <AdvancedImage cldImg={myImage} />
            </div>
          );
        })}
    </>
  );
};

export default Home;
