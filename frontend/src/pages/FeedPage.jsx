import { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import PostForm from "../components/Feed/PostForm";
import PostCard from "../components/Feed/PostCard";
import { api } from "../api/api";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const data = await api("posts", "GET", null, token);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <PostForm refreshPosts={fetchPosts} />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
        ))}
      </div>
    </>
  );
};

export default FeedPage;
