// 'use-client'
import { getUserByUsername, getPostsByUserId } from '../../../lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function UserProfilePage({ params }) {
  const { username } = await params;
  
  // 1. Fetch user data
  const user = getUserByUsername(username);
  
  // If user not found, render Next.js not-found page
  if (!user) {
    notFound();
  }
  
  // 2. Fetch posts by this user
  const userPosts = getPostsByUserId(user.id);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden mb-8">
          {/* Cover Background */}
          <div className="h-48 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
          
          {/* Profile Content */}
          <div className="relative px-6 sm:px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
              <div className="relative">
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* User Info */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {user.fullName}
                </h1>
                <p className="text-xl text-purple-400 mb-3 font-medium">
                  @{user.username}
                </p>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  {user.bio}
                </p>
                
                {/* Stats */}
                <div className="flex justify-center sm:justify-start space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userPosts.length}</div>
                    <div className="text-sm text-gray-400">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {userPosts.reduce((total, post) => total + post.likes, 0)}
                    </div>
                    <div className="text-sm text-gray-400">Total Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {userPosts.reduce((total, post) => total + post.comments.length, 0)}
                    </div>
                    <div className="text-sm text-gray-400">Comments</div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 sm:mt-0 flex space-x-3">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Follow
                </button>
                <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
              <svg className="w-8 h-8 mr-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Posts by {user.fullName}
            </h2>
            <div className="text-sm text-gray-400">
              {userPosts.length} {userPosts.length === 1 ? 'post' : 'posts'}
            </div>
          </div>

          {userPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No posts yet</h3>
              <p className="text-gray-500">This user hasn't shared any posts yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt="Post Image" 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Post Content */}
                  <div className="p-6">
                    <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>
                    
                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments.length}
                        </span>
                      </div>
                      <span className="text-xs">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    
                    {/* View Details Link */}
                    <Link 
                      href={`/post/${post.id}`} 
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 group"
                    >
                      View Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
