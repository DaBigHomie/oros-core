'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Ticket, ArrowRight } from 'lucide-react';

interface FeaturedEventProps {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  imageUrl: string;
  ticketUrl?: string;
  price?: string;
  djName: string;
  genre?: string;
  className?: string;
}

export default function FeaturedEvent({
  title,
  description,
  date,
  time,
  location,
  venue,
  imageUrl,
  ticketUrl,
  price,
  djName,
  genre,
  className = '',
}: FeaturedEventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 shadow-2xl ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-8 md:p-10">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-sm font-semibold mb-4"
        >
          <span className="animate-pulse mr-2">●</span>
          Featured Event
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white mb-3"
        >
          {title}
        </motion.h2>

        {/* DJ Name & Genre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xl text-indigo-300 font-semibold">
            with {djName}
          </span>
          {genre && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-300">{genre}</span>
            </>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-200 text-lg mb-8 max-w-2xl line-clamp-2"
        >
          {description}
        </motion.p>

        {/* Event Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="flex items-center text-white">
            <Calendar className="w-5 h-5 mr-3 text-indigo-400" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p className="font-semibold">{date}</p>
            </div>
          </div>

          <div className="flex items-center text-white">
            <Clock className="w-5 h-5 mr-3 text-indigo-400" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-400">Time</p>
              <p className="font-semibold">{time}</p>
            </div>
          </div>

          <div className="flex items-center text-white">
            <MapPin className="w-5 h-5 mr-3 text-indigo-400" aria-hidden="true" />
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="font-semibold">{venue}</p>
              <p className="text-sm text-gray-300">{location}</p>
            </div>
          </div>

          {price && (
            <div className="flex items-center text-white">
              <Ticket className="w-5 h-5 mr-3 text-indigo-400" aria-hidden="true" />
              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="font-semibold">{price}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Button */}
        {ticketUrl && (
          <motion.a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all group"
            aria-label={`Get tickets for ${title}`}
          >
            Get Tickets
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
    </motion.div>
  );
}
