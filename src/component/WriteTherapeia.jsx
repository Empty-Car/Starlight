import { collection, Timestamp, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";

const WriteTherapeia = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate()
  })

  const [progress, setProgress] = useState(0)

  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const onImageChangeHandler = (e) => {
    setFormData({...formData, image: e.target.files[0]})
  }
  
  const onPublish = () => {
    if(!formData.title || !formData.description || !formData.image) {
      alert("꽉꽉 채워 넣으세유~")
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image)
    uploadImage.on("state_changed", (snapshot) => {
      const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(progressPercent)
    }, 
    (err) => {
      console.log(err);
    },
    () => {
      setFormData({
        title: "",
        description: "",
        image: "",
      })
      getDownloadURL(uploadImage.snapshot.ref)
      .then((url) => {
        const therapeiaRef = collection(db, "therapeia")
        addDoc(therapeiaRef, {
          title: formData.title, 
          description: formData.description,
          imageUrl: url,
          creatdeAt: Timestamp.now().toDate(),
        })
        .then(() => {
          toast("업로드 완료", {type: "succes"})
          setProgress(0)
        })
        .catch(err => {
          toast("업로드 도중 에러", {type:"error"})
        })
      })
    })
  }

  return (
    <div style={{position: "fixed"}}>
      <label htmlFor="">Title</label>
      <input type="text" name="title" value={formData.title} onChange={(e) => onChangeHandler(e)}/>

      <div>
      <label htmlFor="">Description</label>
      <textarea name="description" value={formData.description} onChange={(e) => onChangeHandler(e)}/>
      </div>

      <label htmlFor="">Image</label>
      <input type="file" name="image" accept="image/*" onChange={(e) => onImageChangeHandler(e)}/>

    {progress === 0 ? null : (
      <div className="progress">
        <div className="progress-bar progress-bar-striped mt-2" style={{width: `${progress}%`}}>
          {`uploading image ${progress}%`}
        </div>
      </div>
    )}
      <button onClick={onPublish}>Publish</button>
    </div>
  )
}

export default WriteTherapeia