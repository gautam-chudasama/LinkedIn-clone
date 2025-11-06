import { useState } from "react";
import { Heart, MessageCircle, Edit2, Trash2, Send, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/api";
import { formatDate } from "../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, refreshPosts }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const [editing, setEditing] = useState(false);
  // const [editData, setEditData] = useState({
  //   content: post.content,
  //   image: post.image || "",
  // });
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  // 🧠 Like post
  const handleLike = async () => {
    await api(`posts/${post._id}/like`, "POST", null, token);
    refreshPosts();
  };

  // 🧠 Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    await api(`posts/${post._id}`, "DELETE", null, token);
    refreshPosts();
  };

  // 💬 Add comment
  const handleComment = async () => {
    if (!comment.trim()) return;
    await api(`posts/${post._id}/comment`, "POST", { text: comment }, token);
    setComment("");
    refreshPosts();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
      {/* 🧍 Post Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="bg-blue-600 p-2 rounded-full cursor-pointer"
          onClick={() => navigate(`/profile/${post.userId}`)}
        >
          <User className="text-white" size={20} />
        </div>
        <div className="flex-1">
          <h3
            className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
            onClick={() => navigate(`/profile/${post.userId}`)}
          >
            {post.userName}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
        </div>

        {post.userId === user?.id && (
          <div className="flex gap-2">
            {/* <button
              onClick={() => setEditing(true)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Edit2 size={18} />
            </button> */}
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ✍️ Post Content */}
        <>
          <p className="text-gray-800 mb-4 whitespace-pre-wrap">
            {post.content}
          </p>
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-full rounded-lg mb-4 max-h-96 object-cover"
            />
          )}
        </>

      {/* ❤️ Like + 💬 Comment Buttons */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
        >
          <Heart
            size={20}
            className={
              post.likes.includes(user?.id) ? "fill-red-500 text-red-500" : ""
            }
          />
          <span>{post.likes.length}</span>
        </button>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle size={20} />
          <span>{post.comments.length}</span>
        </div>
      </div>

      {/* 💬 Comments */}
      {post.comments.length > 0 && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
          {post.comments.map((c) => (
            <div key={c._id} className="flex gap-2">
              <div className="bg-gray-200 p-1.5 rounded-full h-fit">
                <User className="text-gray-600" size={16} />
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-3">
                <p className="font-semibold text-sm text-gray-800">
                  {c.userName}
                </p>
                <p className="text-gray-700 text-sm">{c.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(c.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ➕ Add Comment */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleComment()}
        />
        <button
          onClick={handleComment}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
