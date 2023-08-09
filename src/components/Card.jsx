/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";

import "./Card.css";

const Card = ({ post }) => {
  const formattedDate = new Date(post?.updatedAt).toLocaleString();

  return (
    <Link to={`/posts/${post?._id}`} className="homePost">
      <div>
        <img src={post?.img} alt="" />

        <div className="authorInfo">
          <div className="innerField">
            <DateRangeIcon />
            {formattedDate}
          </div>
          <div>|</div>
          <div className="innerField">
            <PersonIcon />
            {post?.author?.username}
          </div>
        </div>
        <h2>{post?.title}</h2>
      </div>
    </Link>
  );
};

export default Card;
