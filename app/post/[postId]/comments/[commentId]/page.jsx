// app/post/[postId]/comments/[commentId]/page.jsx
import { getPostById, getUserByUsername } from '../../../../../lib/data'; // Adjust path
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function SingleCommentPage({ params }) {
  const { postId, commentId } = params;

  const post = getPostById(postId);

  // If the post doesn't exist, trigger 404
  if (!post) {
    notFound();
  }

  // Find the specific comment within the post
  const comment = post.comments.find(c => c.id === commentId);

  // If the comment doesn't exist for this post, trigger 404
  if (!comment) {
    notFound();
  }

  const commentUser = getUserByUsername(comment.user); // Get the user who made the comment

  return (
    <div className="py-8 max-w-xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Comment Details</h1>

        {/* Link back to the parent post */}
        <Link href={`/post/${postId}`} className="text-blue-600 hover:underline mb-6 inline-block">
          &larr; Back to Post
        </Link>

        <div className="border-t pt-6 mt-6">
          <div className="flex items-center mb-3">
            <img src={commentUser?.profilePicture || 'https://via.placeholder.com/40'} alt={commentUser?.fullName || 'User'} className="w-10 h-10 rounded-full mr-3 border-2 border-green-400" />
            <div>
              <Link href={`/profile/${comment.user}`} className="font-semibold text-lg text-blue-700 hover:underline">
                @{comment.user}
              </Link>
              <p className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">{comment.content}</p>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          (This page demonstrates a **nested dynamic route**: `/post/[postId]/comments/[commentId]`)
        </p>
      </div>
    </div>
  );
}