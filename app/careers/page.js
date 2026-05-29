// app/careers/page.js
import Link from 'next/link';
import { Briefcase, MapPin, Clock, DollarSign, Users, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Careers - FrontendEcommerce',
  description: 'Join our team and help shape the future of e-commerce',
};

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120k - $160k',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $140k',
  },
  {
    id: 3,
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Remote',
    type: 'Full-time',
    salary: '$45k - $60k',
  },
  {
    id: 4,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$80k - $110k',
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '$70k - $95k',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Help us build the future of e-commerce</p>
          </div>

          {/* Why Join Us */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Why Join Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Innovative Culture</h3>
                  <p className="text-sm text-gray-600">Work with cutting-edge technology</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Great Team</h3>
                  <p className="text-sm text-gray-600">Collaborate with talented people</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Competitive Benefits</h3>
                  <p className="text-sm text-gray-600">Excellent compensation package</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Work-Life Balance</h3>
                  <p className="text-sm text-gray-600">Flexible working hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Open Positions */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Open Positions</h2>
          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.department}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}