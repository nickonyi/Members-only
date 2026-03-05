import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FileText, Tag, AlertCircle, CheckCircle, Send } from "lucide-react";

const PostCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isAnonymous: false,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        authorId: formData.isAnonymous ? null : user.id,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        createdAt: new Date().toISOString(),
        isAnonymous: formData.isAnonymous,
      };

      const existingPosts = JSON.parse(
        localStorage.getItem("clubhouse_posts") || "[]",
      );
      localStorage.setItem(
        "clubhouse_posts",
        JSON.stringify([newPost, ...existingPosts]),
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/member-feed");
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-secondary glow-text mb-2">
            Create New Post
          </h1>
          <p className="text-gray-400">
            Share your thoughts with the clubhouse community
          </p>
        </div>

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 flex items-start space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-medium">
                Post created successfully!
              </p>
              <p className="text-green-400/80 text-sm">
                Redirecting to member feed...
              </p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Post Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`input-field pl-10 ${errors.title ? "input-error" : ""}`}
                placeholder="Enter a compelling title..."
              />
            </div>
            {errors.title && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className={`input-field resize-none ${errors.content ? "input-error" : ""}`}
              placeholder="Share your thoughts, ideas, or experiences..."
            />
            {errors.content && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.content}</span>
              </p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              {formData.content.length} characters (minimum 20)
            </p>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Tags (comma-separated)
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="technology, innovation, discussion"
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">
              Add tags to help others discover your post
            </p>
          </div>

          <div className="card bg-primary-dark border-gray-700">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-gray-600 text-secondary focus:ring-secondary focus:ring-offset-primary"
              />
              <div>
                <p className="text-gray-300 font-medium">Post Anonymously</p>
                <p className="text-gray-500 text-sm mt-1">
                  Your name will be hidden from public view, but visible to
                  other members
                </p>
              </div>
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary flex items-center space-x-2"
              disabled={success}
            >
              <Send className="w-4 h-4" />
              <span>{success ? "Publishing..." : "Publish Post"}</span>
            </motion.button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 bg-primary-light rounded-lg border border-gray-700"
      >
        <h3 className="text-secondary font-semibold mb-2 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>Posting Guidelines</span>
        </h3>
        <ul className="text-gray-400 text-sm space-y-1 ml-6 list-disc">
          <li>Be respectful and constructive in your posts</li>
          <li>Ensure your content adds value to the community</li>
          <li>Use relevant tags to improve discoverability</li>
          <li>
            Anonymous posts are visible to members with your name, but hidden
            from public view
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default PostCreation;
