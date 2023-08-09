/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPostsAction } from "../redux/slices/postSlice";
import Card from "../components/Card";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAction());
  }, [dispatch]);

  // Get data from the store
  const { posts, loading, error } = useSelector((state) => state?.posts);

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="posts">
          {posts?.posts?.map((post) => (
            <Card key={post?._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
