'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeaturedEvent from '@/components/widgets/FeaturedEvent';
import DJPortfolioPreview from '@/components/widgets/DJPortfolioPreview';
import { BookOpen, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

export default function LMSLandingPage() {
  // Sample data for featured event
  const featuredEvent = {
    title: 'Summer Beats Festival 2026',
    description:
      'Join us for an unforgettable night of electronic music featuring the best DJs from around the world. Experience cutting-edge sound and visual production.',
    date: 'July 15, 2026',
    time: '8:00 PM - 4:00 AM',
    location: 'Los Angeles, CA',
    venue: 'The Palladium',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    ticketUrl: '#',
    price: '$45 - $125',
    djName: 'DJ Phoenix',
    genre: 'Progressive House',
  };

  // Sample data for top DJs
  const topDJs = [
    {
      djId: '1',
      name: 'DJ Phoenix',
      bio: 'Award-winning progressive house DJ with 10+ years of experience. Known for epic festival performances and chart-topping releases.',
      avatarUrl: 'https://images.unsplash.com/photo-1571609803939-54f463c5e4b1?w=400',
      genre: 'Progressive House',
      followers: 125000,
      totalPlays: 3500000,
      topMix: {
        id: '1',
        title: 'Sunset Sessions Vol. 3',
        duration: '62:45',
        plays: 450000,
        audioUrl: '#',
      },
      profileUrl: '#',
      rank: 1,
    },
    {
      djId: '2',
      name: 'Stella Rhythm',
      bio: 'Techno specialist bringing dark, hypnotic beats to dance floors worldwide. Resident DJ at Berlin\'s top underground clubs.',
      avatarUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
      genre: 'Techno',
      followers: 98000,
      totalPlays: 2800000,
      topMix: {
        id: '2',
        title: 'Dark Matter',
        duration: '75:20',
        plays: 380000,
        audioUrl: '#',
      },
      profileUrl: '#',
      rank: 2,
    },
    {
      djId: '3',
      name: 'Marcus Bass',
      bio: 'Deep house maestro crafting soulful grooves. Featured on Beatport Top 100 with multiple releases.',
      avatarUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400',
      genre: 'Deep House',
      followers: 87000,
      totalPlays: 2200000,
      topMix: {
        id: '3',
        title: 'Deep Dive Sessions',
        duration: '58:30',
        plays: 320000,
        audioUrl: '#',
      },
      profileUrl: '#',
      rank: 3,
    },
  ];

  const stats = [
    { icon: Users, label: 'Active Students', value: '10,000+', colorClass: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
    { icon: BookOpen, label: 'Courses Available', value: '150+', colorClass: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { icon: Award, label: 'Expert Instructors', value: '50+', colorClass: 'bg-gradient-to-br from-pink-500 to-pink-600' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%', colorClass: 'bg-gradient-to-br from-orange-500 to-orange-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 dark:bg-indigo-900 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white text-sm font-semibold mb-6"
            >
              <span className="animate-pulse mr-2">●</span>
              Welcome to DJ Jaytek Music Academy
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Master the Art of
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                DJing & Music Production
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Learn from world-class DJs and producers. Build your skills, create amazing mixes,
              and launch your music career with our comprehensive learning platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center group"
              >
                Browse Courses
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.colorClass}`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Event
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don't miss the biggest music event of the year featuring performances from our top instructors
            </p>
          </motion.div>

          <FeaturedEvent {...featuredEvent} />
        </div>
      </section>

      {/* Top DJs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Top DJ Portfolios
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore the profiles of our most successful DJs and hear their exclusive mixes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDJs.map((dj) => (
              <DJPortfolioPreview key={dj.djId} {...dj} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of aspiring DJs and producers who are already learning with us
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-indigo-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-shadow text-lg"
            >
              Get Started Free
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
