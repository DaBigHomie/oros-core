'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioWaveformProps {
  audioUrl: string;
  title?: string;
  artist?: string;
  height?: number;
  waveColor?: string;
  progressColor?: string;
  className?: string;
}

export default function AudioWaveform({
  audioUrl,
  title,
  artist,
  height = 128,
  waveColor = '#4F46E5',
  progressColor = '#818CF8',
  className = '',
}: AudioWaveformProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor,
        progressColor,
        height,
        barWidth: 2,
        barGap: 1,
        barRadius: 3,
        cursorWidth: 2,
        cursorColor: '#4F46E5',
      });

      wavesurfer.current.load(audioUrl);

      wavesurfer.current.on('ready', () => {
        setLoading(false);
        const dur = wavesurfer.current?.getDuration() || 0;
        setDuration(formatTime(dur));
      });

      wavesurfer.current.on('audioprocess', () => {
        const time = wavesurfer.current?.getCurrentTime() || 0;
        setCurrentTime(formatTime(time));
      });

      wavesurfer.current.on('play', () => setIsPlaying(true));
      wavesurfer.current.on('pause', () => setIsPlaying(false));
      wavesurfer.current.on('finish', () => setIsPlaying(false));
    }

    return () => {
      wavesurfer.current?.destroy();
      wavesurfer.current = null;
    };
  }, [audioUrl, height, waveColor, progressColor]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const handleMuteToggle = () => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {/* Track Info */}
      {(title || artist) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {artist && (
            <p className="text-sm text-gray-600 dark:text-gray-400">{artist}</p>
          )}
        </div>
      )}

      {/* Waveform */}
      <div className="relative">
        <div ref={waveformRef} className="w-full" />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            disabled={loading}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-0.5" />
            )}
          </button>

          <button
            onClick={handleMuteToggle}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{currentTime}</span>
            <span className="mx-1">/</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
