'use client';

import React from 'react';
import AudioWaveform from '@/components/widgets/AudioWaveform';
import CourseProgressTracker from '@/components/widgets/CourseProgressTracker';
import { motion } from 'framer-motion';

export default function WidgetsShowcasePage() {
  // Sample course data
  const modules = [
    {
      id: 'module-1',
      title: 'Getting Started with DJing',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to DJ Equipment',
          duration: '15:30',
          completed: true,
          locked: false,
        },
        {
          id: 'lesson-2',
          title: 'Understanding BPM and Beatmatching',
          duration: '22:45',
          completed: true,
          locked: false,
        },
        {
          id: 'lesson-3',
          title: 'Setting Up Your First DJ Setup',
          duration: '18:20',
          completed: false,
          locked: false,
          current: true,
        },
      ],
    },
    {
      id: 'module-2',
      title: 'Mixing Techniques',
      lessons: [
        {
          id: 'lesson-4',
          title: 'EQ and Frequency Mixing',
          duration: '25:10',
          completed: false,
          locked: false,
        },
        {
          id: 'lesson-5',
          title: 'Transitions and Blending',
          duration: '30:00',
          completed: false,
          locked: false,
        },
        {
          id: 'lesson-6',
          title: 'Advanced FX Techniques',
          duration: '28:45',
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: 'module-3',
      title: 'Building Your DJ Identity',
      lessons: [
        {
          id: 'lesson-7',
          title: 'Creating Your DJ Brand',
          duration: '20:15',
          completed: false,
          locked: true,
        },
        {
          id: 'lesson-8',
          title: 'Marketing Yourself as a DJ',
          duration: '35:30',
          completed: false,
          locked: true,
        },
      ],
    },
  ];

  const handleLessonClick = (lessonId: string) => {
    console.log('Navigating to lesson:', lessonId);
    // In a real app, this would navigate to the lesson page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Custom DJ & Learning Widgets
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience our specially designed components for DJs and learners
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Audio Waveform Widget */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Audio Waveform Visualization
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Interactive audio player with real-time waveform visualization for DJ mixes and tracks
            </p>
            <AudioWaveform
              audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              title="Sunset Sessions Vol. 3"
              artist="DJ Phoenix"
              height={128}
            />
          </motion.section>

          {/* Course Progress Tracker Widget */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Course Progress Tracker
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Track your learning journey with an intuitive progress visualization
            </p>
            <CourseProgressTracker
              modules={modules}
              overallProgress={33}
              courseName="Complete DJ Masterclass"
              onLessonClick={handleLessonClick}
            />
          </motion.section>

          {/* Features Grid */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Widget Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Accessible',
                  description: 'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support',
                  icon: '♿',
                },
                {
                  title: 'Responsive',
                  description: 'Optimized for all screen sizes from mobile to desktop',
                  icon: '📱',
                },
                {
                  title: 'Interactive',
                  description: 'Smooth animations and real-time feedback for better user experience',
                  icon: '✨',
                },
                {
                  title: 'Customizable',
                  description: 'Flexible props and theming options to match your brand',
                  icon: '🎨',
                },
                {
                  title: 'Performance',
                  description: 'Optimized rendering and efficient state management',
                  icon: '⚡',
                },
                {
                  title: 'Dark Mode',
                  description: 'Built-in dark mode support for comfortable viewing',
                  icon: '🌙',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
