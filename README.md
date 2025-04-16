# 📸 React + Express + Cloudinary Image Upload App

A full-stack application to **upload images** to [Cloudinary](https://cloudinary.com/), **preview** them instantly in the frontend, and **retrieve public IDs** of stored images for dynamic display.

---

## 🚀 Features

- Upload images via a React frontend using base64 encoding
- Backend powered by Express.js and Cloudinary SDK
- Cloudinary integration for secure image storage and retrieval
- Real-time preview before uploading
- Public image display using `public_id`

---

## 🏗️ Project Structure

cloudinary-react-upload/ ├── client/ │ └── App.jsx │ └── Home.jsx ├── server/ │ └── server.js │ └── utils/ │ └── cloudinary.js └── README.md

---

## 🧰 Tech Stack

- **Frontend**: React, Axios, @cloudinary/react, @cloudinary/url-gen
- **Backend**: Express.js, Cloudinary Node SDK
- **Cloud Storage**: Cloudinary
