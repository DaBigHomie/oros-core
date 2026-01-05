'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Users, Play, Music, ExternalLink } from 'lucide-react';

interface PlatformData {
  platform: string;
  followers: number;
  plays: number;
  color: string;
  logo: string;
  connected: boolean;
  url?: string;
}

interface AnalyticsData {
  date: string;
  spotify: number;
  appleMusic: number;
  soundcloud: number;
}

interface MusicAggregatorDashboardProps {
  platforms: PlatformData[];
  analyticsData: AnalyticsData[];
  totalFollowers: number;
  totalPlays: number;
  monthlyGrowth: number;
  className?: string;
}

export default function MusicAggregatorDashboard({
  platforms,
  analyticsData,
  totalFollowers,
  totalPlays,
  monthlyGrowth,
  className = '',
}: MusicAggregatorDashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<'plays' | 'followers'>('plays');

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const connectedPlatforms = platforms.filter((p) => p.connected);
  const platformDistribution = connectedPlatforms.map((p) => ({
    name: p.platform,
    value: selectedMetric === 'plays' ? p.plays : p.followers,
    color: p.color,
  }));

  const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" aria-hidden="true" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              All Platforms
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatNumber(totalFollowers)}</p>
          <p className="text-sm opacity-90">Total Followers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Play className="w-8 h-8 opacity-80" aria-hidden="true" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              This Month
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatNumber(totalPlays)}</p>
          <p className="text-sm opacity-90">Total Plays</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" aria-hidden="true" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Growth
            </span>
          </div>
          <p className="text-3xl font-bold mb-1">+{monthlyGrowth}%</p>
          <p className="text-sm opacity-90">Monthly Growth</p>
        </motion.div>
      </div>

      {/* Platform Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Connected Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative p-4 rounded-xl border-2 transition-all ${
                platform.connected
                  ? 'border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-3"
                    style={{ backgroundColor: platform.color }}
                  >
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {platform.platform}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {platform.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                {platform.connected && platform.url && (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    aria-label={`View ${platform.platform} profile`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {platform.connected && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatNumber(platform.followers)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Plays</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatNumber(platform.plays)}
                    </p>
                  </div>
                </div>
              )}

              {!platform.connected && (
                <button className="w-full mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                  Connect
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="spotify"
                stroke="#1DB954"
                strokeWidth={2}
                name="Spotify"
              />
              <Line
                type="monotone"
                dataKey="appleMusic"
                stroke="#FA243C"
                strokeWidth={2}
                name="Apple Music"
              />
              <Line
                type="monotone"
                dataKey="soundcloud"
                stroke="#FF5500"
                strokeWidth={2}
                name="SoundCloud"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Platform Distribution
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('plays')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === 'plays'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                Plays
              </button>
              <button
                onClick={() => setSelectedMetric('followers')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedMetric === 'followers'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                Followers
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={platformDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${((percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {platformDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color || COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
