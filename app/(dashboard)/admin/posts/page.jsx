// import { posts } from '../../../../lib/data'; // Adjust path
// import Link from 'next/link';

// export default function AdminPostsPage() {
//   return (
//     <div className="py-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-50 text-center">Manage Posts</h1>
//       <Link href="/admin" className="text-blue-600 hover:underline mb-6 inline-block">
//         &larr; Back to Admin Dashboard
//       </Link>

//       <div className="p-6 rounded-lg shadow-lg">
//         <ul className="space-y-4">
//           {posts.map((post) => (
//             <li key={post.id} className="p-4 bg-gray-800 rounded-md shadow-sm">
//               <p className="font-semibold text-gray-50 mb-2">@{post.user}:</p>
//               <p className="text-gray-50 text-sm mb-3">{post.content}</p>
//               <div className="flex justify-end space-x-2">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
//                   Edit
//                 </button>
//                 <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm">
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { posts } from '../../../../lib/data';
import Link from 'next/link';

export default function AdminPostsPage() {
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Enhanced posts data with admin-specific fields
  const enhancedPosts = posts.map(post => ({
    ...post,
    status: Math.random() > 0.8 ? 'flagged' : Math.random() > 0.9 ? 'hidden' : 'active',
    reports: Math.floor(Math.random() * 5),
    views: Math.floor(Math.random() * 1000) + 100,
    engagement: Math.floor(Math.random() * 50) + 10
  }));

  const filteredPosts = enhancedPosts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'most-reported':
        return b.reports - a.reports;
      case 'most-liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === sortedPosts.length
        ? []
        : sortedPosts.map(post => post.id)
    );
  };

  const handleDeletePost = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting post:', postToDelete.id);
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'flagged': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hidden': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'flagged': return 'Flagged';
      case 'hidden': return 'Hidden';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Admin Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Manage Posts</h1>
              <p className="text-xl text-gray-400">Monitor, moderate, and manage user posts</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white">{sortedPosts.length}</div>
              <div className="text-sm text-gray-400">Total Posts</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search posts or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option value="all">All Posts</option>
                <option value="active">Active</option>
                <option value="flagged">Flagged</option>
                <option value="hidden">Hidden</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-reported">Most Reported</option>
                <option value="most-liked">Most Liked</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPosts.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-purple-900/30 border border-purple-700/50 rounded-xl">
              <span className="text-purple-300 font-medium">
                {selectedPosts.length} post{selectedPosts.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Flag Selected
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium">
                  Hide Selected
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Delete Selected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {/* Select All Header */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPosts.length === sortedPosts.length && sortedPosts.length > 0}
                onChange={handleSelectAll}
                className="w-5 h-5 text-purple-600 bg-black border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="ml-3 text-sm font-medium text-gray-300">
                Select All ({sortedPosts.length} posts)
              </span>
            </div>
          </div>

          {/* Posts */}
          {sortedPosts.map((post) => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedPosts.includes(post.id)}
                  onChange={() => handleSelectPost(post.id)}
                  className="w-5 h-5 text-purple-600 bg-black border-gray-700 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                />

                {/* Post Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/api/placeholder/40/40"
                        alt={post.user}
                        className="w-10 h-10 rounded-full border-2 border-gray-700"
                      />
                      <div>
                        <span className="font-semibold text-white text-lg">@{post.user}</span>
                        <div className="text-sm text-gray-400">
                          {new Date(post.timestamp).toLocaleDateString()} at {new Date(post.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>

                    {/* Status & Reports */}
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(post.status)}`}>
                        {getStatusText(post.status)}
                      </span>
                      {post.reports > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/30 text-red-400 border border-red-700/50">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          {post.reports} reports
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="bg-black border border-gray-800 rounded-xl p-4 mb-4">
                    <p className="text-gray-200 text-lg leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={post.imageUrl}
                        alt="Post content"
                        className="w-full max-w-md h-64 object-cover rounded-xl border border-gray-800"
                      />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-red-400">{post.likes}</div>
                      <div className="text-sm text-gray-500">Likes</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-blue-400">{post.comments.length}</div>
                      <div className="text-sm text-gray-500">Comments</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-green-400">{post.views}</div>
                      <div className="text-sm text-gray-500">Views</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-purple-400">{post.engagement}%</div>
                      <div className="text-sm text-gray-500">Engagement</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center">
                      {/* <svg className></svg> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
}




