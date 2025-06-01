import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl sm:text-9xl lg:text-[12rem] font-black text-gray-800/20 blur-sm">
            404
          </div>
        </div>

        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/25">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto">
            Oops! The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </span>
          </Link>

          <button 
            // onClick={() => window.history.back()}
            className="group px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-6">Or try one of these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/create-post" 
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
            >
              Create Post
            </Link>
            <span className="text-gray-700">•</span>
            <Link 
              href="/profile/johndoe" 
              className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:underline"
            >
              Profile
            </Link>
            <span className="text-gray-700">•</span>
            <Link 
              href="/settings" 
              className="text-pink-400 hover:text-pink-300 transition-colors duration-200 hover:underline"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Floating Elements for Visual Appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}
