import Link from 'next/link';
import { posts, users } from '../lib/data';

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Your Feed
          </h1>
          <p className="text-center text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Discover amazing content from your community
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => {
              const user = users.find(u => u.id === post.userId);
              return (
                <div 
                  key={post.id} 
                  className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Post Image */}
                  {post.imageUrl && (
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt="Post Image" 
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* User Info */}
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <img 
                          src={user.profilePicture} 
                          alt={user?.fullName || 'User'} 
                          className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-purple-500 transition-colors duration-300" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div className="ml-3 flex-1">
                        <Link 
                          href={`/profile/${post.user}`} 
                          className="block text-white hover:text-purple-400 font-semibold text-lg transition-colors duration-200"
                        >
                          @{post.user}
                        </Link>
                        <p className="text-gray-400 text-sm">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
                      {post.content}
                    </p>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span className="font-medium">{post.comments.length}</span>
                        </div>
                      </div>
                      <div className="text-gray-500 text-xs">
                        {new Date(post.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link 
                      href={`/post/${post.id}`} 
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No posts yet</h3>
              <p className="text-gray-500">Be the first to share something amazing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
