'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function CreatorDashboard() {
  const [hashtags, setHashtags] = useState(['fitness', 'wellness', 'motivation']);
  const [newHashtag, setNewHashtag] = useState('');
  const [videos] = useState([
    { id: '1', title: 'Morning Workout Routine', hashtags: ['fitness', 'workout'], views: 12500, earnings: 125.50 },
    { id: '2', title: 'Healthy Meal Prep', hashtags: ['wellness', 'nutrition'], views: 8300, earnings: 83.20 },
    { id: '3', title: 'Motivation Monday', hashtags: ['motivation', 'mindset'], views: 15600, earnings: 156.00 },
  ]);
  const [matches] = useState([
    { id: '1', campaign: 'Summer Fitness Challenge', score: 85, budget: 5000 },
    { id: '2', campaign: 'Wellness Brand Partnership', score: 72, budget: 3000 },
    { id: '3', campaign: 'Athletic Wear Launch', score: 68, budget: 8000 },
  ]);

  const totalEarnings = videos.reduce((sum, video) => sum + video.earnings, 0);
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);

  const addHashtag = () => {
    if (newHashtag && !hashtags.includes(newHashtag)) {
      setHashtags([...hashtags, newHashtag]);
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
          <p className="text-gray-600">Manage your content, track earnings, and discover opportunities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Earnings</div>
            <div className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Views</div>
            <div className="text-3xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Videos</div>
            <div className="text-3xl font-bold text-purple-600">{videos.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending Matches</div>
            <div className="text-3xl font-bold text-orange-600">{matches.length}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Hashtags & Matching */}
          <div className="md:col-span-1 space-y-6">
            {/* Hashtag Management */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Your Hashtags</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newHashtag}
                  onChange={(e) => setNewHashtag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                  placeholder="Add hashtag"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={addHashtag}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map(tag => (
                  <span
                    key={tag}
                    className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    #{tag}
                    <button
                      onClick={() => removeHashtag(tag)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Campaign Matches (Tinder-style) */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Campaign Matches</h2>
              <div className="space-y-4">
                {matches.map(match => (
                  <div key={match.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{match.campaign}</h3>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {match.score}% match
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      Budget: ${match.budget.toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">
                        ✓ Accept
                      </button>
                      <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300">
                        ✗ Pass
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Videos */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Videos</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  + Upload Video
                </button>
              </div>
              <div className="space-y-4">
                {videos.map(video => (
                  <div key={video.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{video.title}</h3>
                      <span className="text-green-600 font-bold">${video.earnings.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      {video.hashtags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>👁 {video.views.toLocaleString()} views</span>
                      <span>📊 ${(video.earnings / video.views * 1000).toFixed(2)} per 1k views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
