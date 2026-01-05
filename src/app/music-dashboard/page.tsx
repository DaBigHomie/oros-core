'use client';

import React from 'react';
import MusicAggregatorDashboard from '@/components/dashboard/MusicAggregatorDashboard';
import { motion } from 'framer-motion';

export default function MusicDashboardPage() {
  // Sample platform data
  const platforms = [
    {
      platform: 'Spotify',
      followers: 125000,
      plays: 3500000,
      color: '#1DB954',
      logo: 'spotify',
      connected: true,
      url: 'https://spotify.com',
    },
    {
      platform: 'Apple Music',
      followers: 98000,
      plays: 2800000,
      color: '#FA243C',
      logo: 'apple',
      connected: true,
      url: 'https://music.apple.com',
    },
    {
      platform: 'SoundCloud',
      followers: 87000,
      plays: 2200000,
      color: '#FF5500',
      logo: 'soundcloud',
      connected: true,
      url: 'https://soundcloud.com',
    },
    {
      platform: 'YouTube Music',
      followers: 156000,
      plays: 4200000,
      color: '#FF0000',
      logo: 'youtube',
      connected: false,
    },
    {
      platform: 'Tidal',
      followers: 42000,
      plays: 980000,
      color: '#000000',
      logo: 'tidal',
      connected: false,
    },
    {
      platform: 'Mixcloud',
      followers: 33000,
      plays: 750000,
      color: '#314359',
      logo: 'mixcloud',
      connected: false,
    },
  ];

  // Sample analytics data for the last 7 days
  const analyticsData = [
    { date: 'Jan 1', spotify: 45000, appleMusic: 32000, soundcloud: 28000 },
    { date: 'Jan 2', spotify: 48000, appleMusic: 35000, soundcloud: 30000 },
    { date: 'Jan 3', spotify: 52000, appleMusic: 38000, soundcloud: 33000 },
    { date: 'Jan 4', spotify: 47000, appleMusic: 36000, soundcloud: 31000 },
    { date: 'Jan 5', spotify: 55000, appleMusic: 42000, soundcloud: 36000 },
    { date: 'Jan 6', spotify: 58000, appleMusic: 45000, soundcloud: 38000 },
    { date: 'Jan 7', spotify: 62000, appleMusic: 48000, soundcloud: 41000 },
  ];

  const totalFollowers = platforms
    .filter((p) => p.connected)
    .reduce((sum, p) => sum + p.followers, 0);
  
  const totalPlays = platforms
    .filter((p) => p.connected)
    .reduce((sum, p) => sum + p.plays, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Music Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your performance across all music platforms in real-time
          </p>
        </motion.div>

        {/* Dashboard */}
        <MusicAggregatorDashboard
          platforms={platforms}
          analyticsData={analyticsData}
          totalFollowers={totalFollowers}
          totalPlays={totalPlays}
          monthlyGrowth={18.5}
        />

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Connect More Platforms
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Get a complete view of your music career by connecting all your streaming platforms.
            The more platforms you connect, the better insights you'll get.
          </p>
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Connect Platform
          </button>
        </motion.div>
      </div>
    </div>
  );
}
