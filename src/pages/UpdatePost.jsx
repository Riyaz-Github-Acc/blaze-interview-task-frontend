/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePostAction, fetchPostAction } from "../redux/slices/postSlice";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const { id } = useParams();
  //Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostAction(id));
  }, [id, dispatch]);

  // Get Data from Store
  const { post, loading, error, isUpdated } = useSelector(
    (state) => state?.posts
  );

  const [data, setData] = useState({
    title: post?.data?.title || "",
    desc: post?.data?.desc || "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      title: post?.data?.title,
      desc: post?.data?.desc,
    }));
  }, [post?.data?.title, post?.data?.desc]);

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

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch
    dispatch(
      updatePostAction({
        id,
        title: data?.title,
        desc: data?.desc,
        file: file || null,
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
          Upload Image
          <span>
            {fileError && <span style={{ color: "red" }}>{fileError}</span>}
          </span>
        </label>
        <input type="file" id="img" onChange={handleFileChange} />
        <button>Update Post</button>
      </form>
    </main>
  );
};

export default UpdatePost;
