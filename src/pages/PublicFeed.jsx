import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { posts as initialPosts } from "../data/mockData";
import {
  Search,
  Filter,
  Calendar,
  Tag,
  Globe,
  TrendingUp,
  Lock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicFeed = () => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const storedPosts = JSON.parse(
      localStorage.getItem("clubhouse_posts") || "[]",
    );
    const allPosts = [...storedPosts, ...initialPosts];
    setPosts(allPosts);
  }, []);

  const allTags = ["all", ...new Set(posts.flatMap((post) => post.tags))];

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTag === "all" || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary glow-text mb-2 flex items-center space-x-3">
              <Globe className="w-8 h-8" />
              <span>Public Feed</span>
            </h1>
            <p className="text-gray-400">
              Discover posts from the clubhouse community
            </p>
          </div>
          {!isAuthenticated && (
            <Link to="/signup" className="btn-primary">
              Join to See Authors
            </Link>
          )}
        </div>
      </motion.div>

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/30"
        >
          <div className="flex items-start space-x-4">
            <Lock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-secondary font-semibold mb-2">
                Unlock Full Access
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Join our exclusive clubhouse to see post authors, create your
                own content, and engage with the community.
              </p>
              <div className="flex space-x-3">
                <Link to="/signup" className="btn-primary text-sm">
                  Create Account
                </Link>
                <Link to="/login" className="btn-outline text-sm">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Search Posts
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by title or content..."
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Sort By
            </label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field pl-10 appearance-none"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Filter by Tag
          </label>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-secondary text-primary"
                    : "bg-primary-light text-gray-300 border border-gray-700 hover:border-secondary"
                }`}
              >
                {tag === "all" ? "All Posts" : tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-secondary font-semibold">
              {filteredPosts.length}
            </span>{" "}
            posts
          </p>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="card-hover"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-gray-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-gray-400 font-semibold flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Anonymous Author</span>
                    </h3>
                    <span className="text-gray-500 text-sm flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </span>
                  </div>

                  <h2 className="text-xl font-heading font-bold text-white mb-3">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="badge-accent flex items-center space-x-1"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PublicFeed;
