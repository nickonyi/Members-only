import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { posts as initialPosts, members } from "../data/mockData";
import { Search, Filter, Calendar, Tag, User, TrendingUp } from "lucide-react";

const MemberFeed = () => {
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
        <h1 className="text-3xl font-heading font-bold text-secondary glow-text mb-2">
          Member Feed
        </h1>
        <p className="text-gray-400">
          Explore posts from all clubhouse members
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
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
          {filteredPosts.map((post, index) => {
            const author = members.find((m) => m.id === post.authorId);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="card-hover"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">
                      {author?.name?.charAt(0).toUpperCase() || "A"}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-gray-300 font-semibold flex items-center space-x-2">
                        <User className="w-4 h-4 text-secondary" />
                        <span>{author?.name || "Anonymous Member"}</span>
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
                          className="badge-primary flex items-center space-x-1"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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

export default MemberFeed;
