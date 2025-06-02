// app/post/[postId]/page.jsx
import { getPostById, getUserByUsername } from '../../../lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function SinglePostPage({ params }) {
  const { postId } = await params;

  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  const postUser = getUserByUsername(post.user); // Get the user who made the post

  return (
    <div className="py-8 max-w-2xl mx-auto">
      {/* This is the main post content block */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <img src={postUser?.profilePicture || 'https://via.placeholder.com/50'} alt={postUser?.fullName || 'User'} className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400" />
          <div>
            <Link href={`/profile/${post.user}`} className="text-xl font-bold text-blue-700 hover:underline">
              @{post.user}
            </Link>
            <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
          </div>
        </div>

        <p className="text-gray-800 text-lg mb-6 leading-relaxed">{post.content}</p>

        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post Image" className="w-full max-h-96 object-contain rounded-md mb-6 border border-gray-200" />
        )}

        <div className="flex items-center space-x-6 text-gray-600 mb-8">
          <span className="flex items-center">
            ❤️ {post.likes} Likes
          </span>
          <span className="flex items-center">
            💬 {post.comments.length} Comments
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Comments</h3>
        {post.comments.length === 0 ? (
          <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {/* This is where the comments are correctly mapped */}
            {post.comments.map((comment) => {
              const commentUser = getUserByUsername(comment.user); // commentUser is correctly defined here
              return (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-2">
                    <img src={commentUser?.profilePicture || 'https://via.placeholder.com/40'} alt={commentUser?.fullName || 'User'} className="w-8 h-8 rounded-full mr-3" />
                    <Link href={`/profile/${comment.user}`} className="font-semibold text-blue-600 hover:underline">
                      @{comment.user}
                    </Link>
                    <span className="text-xs text-gray-400 ml-auto">{new Date(comment.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  {/* ADD THIS LINK BELOW THE COMMENT CONTENT */}
                  <Link href={`/post/${post.id}/comments/${comment.id}`} className="text-xs text-blue-500 hover:underline mt-2 inline-block">
                    View Comment Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}