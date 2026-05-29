// app/press/page.js
import Link from 'next/link';
import { Newspaper, Calendar, User, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Press & Media - ShopHub',
  description: 'Latest news and press releases',
};

// Sample press articles
const pressArticles = [
  {
    id: 1,
    title: 'ShopHub Raises $10M in Series A Funding',
    date: 'March 15, 2024',
    author: 'TechCrunch',
    excerpt: 'The e-commerce platform continues to grow rapidly with new funding round led by leading venture capital firms.',
    link: '#',
  },
  {
    id: 2,
    title: 'New Features Launch: Enhanced Shopping Experience',
    date: 'February 28, 2024',
    author: 'Forbes',
    excerpt: 'Introducing AI-powered recommendations and faster checkout experience for customers worldwide.',
    link: '#',
  },
  {
    id: 3,
    title: 'ShopHub Named Best Startup of 2024',
    date: 'January 10, 2024',
    author: 'Business Insider',
    excerpt: 'Recognized for innovation in e-commerce and exceptional customer satisfaction ratings.',
    link: '#',
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Press & Media
          </h1>
          <p className="text-gray-600 mt-2">Latest news and announcements</p>
        </div>

        <div className="space-y-6">
          {pressArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {article.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {article.author}
                    </span>
                  </div>
                  <p className="text-gray-600">{article.excerpt}</p>
                  <a 
                    href={article.link}
                    className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
                  >
                    Read more <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact for Press */}
        <div className="mt-8 bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="font-semibold text-gray-800 mb-2">Media Inquiries</h3>
          <p className="text-gray-600 text-sm">
            For press-related questions, please contact us at:<br />
            <a href="mailto:press@shophub.com" className="text-purple-600 hover:text-purple-700">
              press@shophub.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}