import { Heart, MessageCircle, User } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { useAuth } from "../../hooks/useAuth";

const ProfilePosts = ({ posts }) => {
  const { user } = useAuth();

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500 bg-white p-4 rounded-lg shadow-sm">
        This user hasn’t posted anything yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="text-white" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{post.userName}</h3>
              <p className="text-sm text-gray-500">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

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

          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
            <button className="flex items-center gap-2 text-gray-600">
              <Heart
                size={20}
                className={
                  post.likes.includes(user?.id)
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />
              <span>{post.likes.length}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600">
              <MessageCircle size={20} />
              <span>{post.comments.length}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
