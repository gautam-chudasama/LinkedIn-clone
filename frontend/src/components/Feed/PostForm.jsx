import { useState } from "react";
import { api } from "../../api/api";
import { useAuth } from "../../hooks/useAuth";

const PostForm = ({ refreshPosts }) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useAuth();

  const handlePost = async () => {
    if (!content.trim()) return;
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    await api("posts", "POST", formData, token, true);
    setContent("");
    setFile(null);
    refreshPosts();
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <p className="text-red-500 text-s mb-3">Thoughts are Compulsory⬇️</p>
      <textarea
        className="w-full p-4 border rounded-lg resize-none"
        rows="3"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-3">
        <input
          type="file"
          accept="image/*"
          className="w-full p-3 border rounded-lg text-white cursor-pointer bg-gray-700 dark:md:hover:bg-gray-500"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && (
          <div className="mt-2 text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
      </div>
      <button
        onClick={handlePost}
        className="mt-4 px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
    </div>
  );
};

export default PostForm;
