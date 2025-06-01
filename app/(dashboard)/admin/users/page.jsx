// // app/(dashboard)/admin/users/page.jsx
// import { users } from '../../../../lib/data'; // Adjust path
// import Link from 'next/link';

// export default function AdminUsersPage() {
//   return (
//     <div className="py-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Manage Users</h1>
//       <Link href="/admin" className="text-blue-600 hover:underline mb-6 inline-block">
//         &larr; Back to Admin Dashboard
//       </Link>

//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <ul className="space-y-4">
//           {users.map((user) => (
//             <li key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm">
//               <div className="flex items-center">
//                 <img src={user.profilePicture} alt={user.fullName} className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300" />
//                 <div>
//                   <p className="font-semibold text-lg text-gray-800">{user.fullName}</p>
//                   <p className="text-gray-600">@{user.username}</p>
//                 </div>
//               </div>
//               <div className="space-x-2">
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
import { users } from '../../../../lib/data';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Enhanced users data with admin-specific fields
  const enhancedUsers = users.map(user => ({
    ...user,
    status: Math.random() > 0.9 ? 'banned' : Math.random() > 0.8 ? 'suspended' : 'active',
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    postsCount: Math.floor(Math.random() * 100) + 1,
    reportsCount: Math.floor(Math.random() * 5)
  }));

  const filteredUsers = enhancedUsers.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.fullName.localeCompare(b.fullName);
      case 'username':
        return a.username.localeCompare(b.username);
      case 'newest':
        return new Date(b.joinDate) - new Date(a.joinDate);
      case 'oldest':
        return new Date(a.joinDate) - new Date(b.joinDate);
      case 'posts':
        return b.postsCount - a.postsCount;
      default:
        return 0;
    }
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'suspended': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'banned': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'suspended': return 'Suspended';
      case 'banned': return 'Banned';
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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Manage Users</h1>
              <p className="text-xl text-gray-400">Monitor and manage user accounts</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-white">{sortedUsers.length}</div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search users by name, username, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option value="name">Sort by Name</option>
                <option value="username">Sort by Username</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="posts">Most Posts</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex items-center justify-between p-4 bg-purple-900/30 border border-purple-700/50 rounded-xl">
              <span className="text-purple-300 font-medium">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Suspend Selected
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium">
                  Ban Selected
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {sortedUsers.map((user) => (
            <div key={user.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:bg-gray-800/50 transition-all duration-200">
              <div className="flex items-center space-x-4">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                  className="w-5 h-5 text-purple-600 bg-black border-gray-700 rounded focus:ring-purple-500 focus:ring-2"
                />

                {/* Profile Picture */}
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-16 h-16 rounded-full border-3 border-gray-700 object-cover"
                />

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white">{user.fullName}</h3>
                      <p className="text-gray-400">@{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                      {user.reportsCount > 0 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/30 text-red-400 border border-red-700/50">
                          {user.reportsCount} reports
                        </span>
                      )}
                    </div>
                  </div>

                  {/* User Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-blue-400">{user.postsCount}</div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-green-400">{user.followers?.length || 0}</div>
                      <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-purple-400">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">Joined</div>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-yellow-400">
                        {Math.floor((Date.now() - new Date(user.lastActive)) / (1000 * 60 * 60 * 24))}d
                      </div>
                      <div className="text-xs text-gray-500">Last Active</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>

                    <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Profile
                    </button>

                    {user.status === 'active' ? (
                      <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                        </svg>
                        Suspend
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}





