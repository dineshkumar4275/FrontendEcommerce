// app/blog/page.js
import Link from 'next/link';
import { Newspaper, Calendar, User, Clock, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Blog - ShopHub',
  description: 'Latest news, tips, and updates from our team',
};

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: '10 Tips for Better Online Shopping',
    date: 'April 1, 2024',
    author: 'Sarah Johnson',
    readTime: '5 min read',
    excerpt: 'Learn how to make the most of your online shopping experience...',
    category: 'Shopping Tips',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'How We\'re Improving Delivery Times',
    date: 'March 20, 2024',
    author: 'Mike Chen',
    readTime: '3 min read',
    excerpt: 'Behind the scenes of our logistics optimization...',
    category: 'Company News',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Top 5 Products This Month',
    date: 'March 10, 2024',
    author: 'Emily Watson',
    readTime: '4 min read',
    excerpt: 'Discover the most popular items among our customers...',
    category: 'Product Highlights',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=400&fit=crop',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Our Blog
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Insights, tips, and updates from our team</p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                {/* Featured Image */}
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-purple-600 transition">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm inline-flex items-center gap-1"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-purple-100 mb-6">Get the latest posts delivered to your inbox</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition">
                Subscribe
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}