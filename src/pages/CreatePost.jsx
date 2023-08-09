/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../redux/slices/postSlice";

const CreatePost = () => {
  //Dispatch
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: "",
    desc: "",
  });

  //---onChange---
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //File
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  //File Handle Change
  const handleFileChange = (event) => {
    const newFile = event.target.files[0];

    //Image Validation
    if (newFile?.size > 1000000) {
      setFileError(`${newFile?.name} is too large`);
    }
    if (!newFile?.type?.startsWith("image/")) {
      setFileError(`${newFile?.name} is not an image`);
    }

    setFile(newFile);
  };

  // Get Data from Store
  const { loading, error, isAdded } = useSelector((state) => state?.posts);

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    //Dispatch
    dispatch(
      createPostAction({
        title: data?.title,
        desc: data?.desc,
        file,
      })
    );

    // Reset Form
    setData({
      title: "",
      desc: "",
    });
  };

  return (
    <main className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title <span>*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={data?.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <label htmlFor="desc">
          Content <span>*</span>
        </label>
        <textarea
          id="desc"
          name="desc"
          value={data?.desc}
          onChange={handleChange}
          cols="30"
          rows="5"
          placeholder="Content"
          required
        ></textarea>

        <label htmlFor="img">
          Upload Image <span>*</span>
        </label>
        <input type="file" id="img" onChange={handleFileChange} required />
        <button>Create Post</button>
      </form>
    </main>
  );
};

export default CreatePost;
