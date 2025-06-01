// app/catch-all/[...slug]/page.jsx
import Link from 'next/link';

export default function CatchAllPage({ params }) {
  const { slug } = params; // slug will be an array of the matched segments

  return (
    <div className="py-8 text-center bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Catch-All Route Demo</h1>
      <p className="text-lg text-gray-700 mb-6">
        You accessed the URL path: <code className="bg-gray-200 p-1 rounded font-mono">{`/catch-all/${slug.join('/')}`}</code>
      </p>
      <p className="text-gray-600 mb-8">
        The dynamic segments captured by <code className="bg-gray-200 p-1 rounded font-mono">[...slug]</code> are:
      </p>
      {slug && slug.length > 0 ? (
        <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2 mb-8">
          {slug.map((segment, index) => (
            <li key={index} className="text-gray-700">
              Segment {index + 1}: <code className="bg-blue-100 text-blue-800 p-1 rounded font-mono">{segment}</code>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic mb-8">No segments were captured (you are at /catch-all/).</p>
      )}

      <p className="text-sm text-gray-500 mt-8">
        (This demonstrates a **catch-all route**. It captures all subsequent URL segments as an array.)
      </p>
      <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
        Go back to Home
      </Link>
    </div>
  );
}