/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePostAction, fetchPostAction } from "../redux/slices/postSlice";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";

import "./SinglePost.css";
import { createCommentAction } from "../redux/slices/commentSlice";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostAction(id));
  }, [id, dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePostAction(id));
    window.location.href = "/";
  };

  const { post, loading, error } = useSelector((state) => state?.posts);

  const formattedDate = new Date(post?.data?.updatedAt).toLocaleString();

  const { userInfo } = useSelector((state) => state?.users?.userAuth);

  const [data, setData] = useState({
    comment: "",
  });

  // onChange
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createCommentAction({
        id: post?.data?._id,
        comment: data?.comment,
      })
    );

    // Reset Form Data
    setData({
      comment: "",
    });
  };

  return (
    <main>
      <>
        {error && <p>{error}</p>}

        <div>
          <div className="firstRow">
            <div className="authorInfo">
              <div className="innerField">
                <DateRangeIcon />
                {formattedDate}
              </div>
              <div>|</div>
              <div className="innerField">
                <PersonIcon />
                {post?.data?.author?.username}
              </div>
            </div>

            <div className="action">
              {userInfo?.data?.id === post?.data?.author?._id && (
                <>
                  <Link to={`/edit-post/${id}`}>
                    <EditIcon />
                  </Link>
                  <Link onClick={() => handleDelete(id)}>
                    <DeleteIcon />
                  </Link>
                </>
              )}
            </div>
          </div>

          <img src={post?.data?.img} alt="" />
          <h2>{post?.data?.title}</h2>
          <p>{post?.data?.desc}</p>

          <div className="comment-sec">
            <h2>Comments</h2>

            {post?.data?.comments.map((commentInfo) => (
              <div key={commentInfo?._id}>
                <div className="comment">
                  <h3>{commentInfo?.user?.username}</h3> -
                  <div>{commentInfo?.comment}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </main>
  );
};

export default SinglePost;
