import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { posts, members } from "../data/mockData";
import {
  TrendingUp,
  Users,
  FileText,
  Crown,
  Calendar,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  const userPosts = posts.filter((post) => post.authorId === user?.id);
  const totalMembers = members.length;
  const totalPosts = posts.length;

  const stats = [
    {
      label: "Your Posts",
      value: userPosts.length,
      icon: FileText,
      color: "from-secondary to-accent",
    },
    {
      label: "Total Members",
      value: totalMembers,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Posts",
      value: totalPosts,
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-secondary glow-text">
                Welcome, {user?.name}
              </h1>
              <p className="text-gray-400 flex items-center space-x-2 mt-1">
                <Crown className="w-4 h-4" />
                <span>Exclusive Member</span>
              </p>
            </div>
          </div>
          <Link to="/create-post" className="btn-primary">
            Create New Post
          </Link>
        </div>

        <div className="divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 text-gray-300">
            <Mail className="w-5 h-5 text-secondary" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <Calendar className="w-5 h-5 text-secondary" />
            <span>
              Member since {new Date(user?.memberSince).toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-hover"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-4xl font-bold text-white mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-secondary">
            Recent Activity
          </h2>
          <Link
            to="/member-feed"
            className="text-secondary hover:text-secondary-light transition-colors text-sm font-medium"
          >
            View All Posts →
          </Link>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post, index) => {
            const author = members.find((m) => m.id === post.authorId);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:border-secondary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">
                          {author?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-300 font-medium text-sm">
                          {author?.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="badge-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
