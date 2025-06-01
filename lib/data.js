// lib/data.js

export const users = [
  {
    id: 'user1',
    username: 'beliveharsh',
    fullName: 'Harsh Dahiya ',
    bio: 'Software Engineer, coffee enthusiast, and casual gamer.',
    profilePicture: '/Pictures/User_avatar_one.png',
  },
  {
    id: 'user2',
    username: 'devendradev11',
    fullName: 'Devendra Sooryavanshi',
    bio: 'Product Manager, avid reader, and nature lover.',
    profilePicture: '/Pictures/User_avatar_two.jpg',
  },
  {
    id: 'user3',
    username: 'imhiteshchoudhary',
    fullName: 'Hitesh Choudhary',
    bio: 'Full-stack developer, passionate about open source.',
    profilePicture: '/Pictures/User_avatar_four.png',
  },
];

export const posts = [
  {
    id: 'post1',
    userId: 'user1',
    user: 'johndoe',
    content: 'Just had an amazing coffee! ☕ So ready for a productive day. #coffeelover #morningvibes',
    imageUrl: '/Pictures/Picture_one.jpeg',
    timestamp: '2025-05-30T10:00:00Z',
    likes: 125,
    comments: [
      { id: 'comment1-1', userId: 'user2', user: 'janesmith', content: 'Looks delicious!', timestamp: '2025-05-30T10:05:00Z' },
      { id: 'comment1-2', userId: 'user3', user: 'alex_code', content: 'Enjoy!', timestamp: '2025-05-30T10:10:00Z' },
    ],
  },
  {
    id: 'post2',
    userId: 'user2',
    user: 'janesmith',
    content: 'Loving the new Next.js App Router! So powerful and intuitive. #nextjs #webdev #frontend',
    imageUrl: '/Pictures/Picture_two.jpeg',
    timestamp: '2025-05-29T14:30:00Z',
    likes: 240,
    comments: [
      { id: 'comment2-1', userId: 'user1', user: 'johndoe', content: 'Agreed! It\'s a game-changer.', timestamp: '2025-05-29T14:40:00Z' },
    ],
  },
  {
    id: 'post3',
    userId: 'user3',
    user: 'alex_code',
    content: 'Building something cool today. Stay tuned! ✨ Hint: it involves server components.',
    imageUrl: '/Pictures/Picture_four.jpg',

    timestamp: '2025-05-28T09:15:00Z',
    likes: 88,
    comments: [],
  },
  {
    id: 'post4',
    userId: 'user1',
    user: 'johndoe',
    content: 'Just finished a great workout! 💪 Feeling energized. #fitness #healthy',
    imageUrl: '/Pictures/Picture_three.jpg',
    profilePicture: '/Pictures/Picture_three.jpg',
    timestamp: '2025-05-27T18:00:00Z',
    likes: 90,
    comments: [],
  },
];

// Helper functions (simulating data fetching)
export function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

export function getPostsByUserId(userId) {
  return posts.filter(post => post.userId === userId);
}

export function getPostById(postId) {
  return posts.find(post => post.id === postId);
}