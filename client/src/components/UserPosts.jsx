import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/axios.instance";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Post from "./Post";

const UserPosts = () => {
  const [usersPosts, setUserPosts] = useState([]);
  const { username } = useParams();

  const getPosts = async () => {
    try {
      const { data } = await api.get(`/posts/get-user-posts/${username}`);
      setUserPosts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, [username]);

  return (
    <div className="w-full md:flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {usersPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserPosts;
