'use client';

import React from 'react';
import { CheckCircle2, Circle, Lock, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Lesson {
  id: string;
  title: string;
  duration?: string;
  completed: boolean;
  locked: boolean;
  current?: boolean;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseProgressTrackerProps {
  modules: Module[];
  overallProgress: number;
  courseName: string;
  onLessonClick?: (lessonId: string) => void;
  className?: string;
}

export default function CourseProgressTracker({
  modules,
  overallProgress,
  courseName,
  onLessonClick,
  className = '',
}: CourseProgressTrackerProps) {
  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedLessons = modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {courseName}
        </h2>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            {completedLessons} of {totalLessons} lessons completed
          </span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {overallProgress}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
          />
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-500">
          <span>Just started</span>
          <span>Halfway there</span>
          <span>Complete!</span>
        </div>
      </div>

      {/* Modules and Lessons */}
      <div className="space-y-6" role="list" aria-label="Course modules">
        {modules.map((module, moduleIndex) => {
          const moduleProgress = Math.round(
            (module.lessons.filter((l) => l.completed).length /
              module.lessons.length) *
              100
          );

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.1 }}
              className="border-l-4 border-indigo-500 pl-4"
              role="listitem"
            >
              {/* Module Header */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {module.title}
                </h3>
                <div className="flex items-center mt-1">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${moduleProgress}%` }}
                      transition={{ duration: 0.8, delay: moduleIndex * 0.1 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                  <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
                    {moduleProgress}%
                  </span>
                </div>
              </div>

              {/* Lessons */}
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => {
                  const Icon = lesson.completed
                    ? CheckCircle2
                    : lesson.locked
                    ? Lock
                    : lesson.current
                    ? PlayCircle
                    : Circle;

                  return (
                    <motion.button
                      key={lesson.id}
                      onClick={() => !lesson.locked && onLessonClick?.(lesson.id)}
                      disabled={lesson.locked}
                      whileHover={!lesson.locked ? { x: 4 } : {}}
                      whileTap={!lesson.locked ? { scale: 0.98 } : {}}
                      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                        lesson.locked
                          ? 'cursor-not-allowed opacity-50'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                      } ${
                        lesson.current
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800'
                          : ''
                      }`}
                      aria-label={`${lesson.title}${lesson.locked ? ' (locked)' : ''}${
                        lesson.completed ? ' (completed)' : ''
                      }`}
                      aria-disabled={lesson.locked}
                    >
                      <Icon
                        className={`w-5 h-5 flex-shrink-0 ${
                          lesson.completed
                            ? 'text-green-500'
                            : lesson.current
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : lesson.locked
                            ? 'text-gray-400'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      <div className="ml-3 flex-1 text-left">
                        <p
                          className={`text-sm font-medium ${
                            lesson.completed
                              ? 'text-gray-900 dark:text-white line-through'
                              : lesson.current
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {lesson.title}
                        </p>
                        {lesson.duration && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {lesson.duration}
                          </p>
                        )}
                      </div>
                      {lesson.completed && (
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          Done
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Message */}
      {overallProgress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
        >
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              Congratulations! You've completed this course! 🎉
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
