'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, TrendingUp, Users, ExternalLink } from 'lucide-react';

interface Mix {
  id: string;
  title: string;
  duration: string;
  plays: number;
  audioUrl: string;
}

interface DJPortfolioPreviewProps {
  djId: string;
  name: string;
  bio: string;
  avatarUrl: string;
  genre: string;
  followers: number;
  totalPlays: number;
  topMix: Mix;
  profileUrl: string;
  rank?: number;
  className?: string;
}

export default function DJPortfolioPreview({
  djId,
  name,
  bio,
  avatarUrl,
  genre,
  followers,
  totalPlays,
  topMix,
  profileUrl,
  rank,
  className = '',
}: DJPortfolioPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // In real implementation, this would control actual audio playback
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (rank || 0) * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group ${className}`}
    >
      <a
        href={profileUrl}
        className="block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
      >
        {/* Rank Badge */}
        {rank && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">#{rank}</span>
            </div>
          </motion.div>
        )}

        {/* Avatar Section */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600">
          <img
            src={avatarUrl}
            alt={`${name}'s profile`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Play Button Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  onClick={handlePlayPause}
                  className="p-6 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors"
                  aria-label={isPlaying ? 'Pause mix' : 'Play mix'}
                >
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white ml-1" />
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Genre Badge */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium">
              <Music2 className="w-3 h-3 mr-1" aria-hidden="true" />
              {genre}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* DJ Name */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {name}
          </h3>

          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 text-indigo-500 mr-2" aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatNumber(followers)}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-indigo-500 mr-2" aria-hidden="true" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Plays</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatNumber(totalPlays)}
                </p>
              </div>
            </div>
          </div>

          {/* Top Mix */}
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Top Mix
            </p>
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {topMix.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {topMix.duration} • {formatNumber(topMix.plays)} plays
                </p>
              </div>
              <button
                onClick={handlePlayPause}
                className="ml-2 p-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full transition-colors"
                aria-label={`${isPlaying ? 'Pause' : 'Play'} ${topMix.title}`}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>
            </div>
          </div>

          {/* View Profile Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="mt-4 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-medium"
          >
            View Full Profile
            <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
          </motion.div>
        </div>
      </a>

      {/* Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 -z-10"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
