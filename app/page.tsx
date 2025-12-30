'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Store lead in localStorage for demo (in production, send to API)
    localStorage.setItem('lead_email', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            OROS
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            The Future of Creator Economy
          </p>
        </header>

        {/* Countdown */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Launching in
          </h2>
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-8 text-center"
              >
                <div className="text-4xl md:text-6xl font-bold mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm md:text-lg text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">For Creators</h3>
              <p className="text-gray-400">
                Monetize your influence with smart hashtag matching and transparent earnings
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">For Businesses</h3>
              <p className="text-gray-400">
                Find perfect creators for your campaigns with powerful analytics
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-2">For Supporters</h3>
              <p className="text-gray-400">
                Earn micro-commissions by supporting your favorite creators
              </p>
            </div>
          </div>
        </div>

        {/* Lead Capture */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
            {!submitted ? (
              <>
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Get Early Access
                </h3>
                <p className="text-gray-300 mb-6 text-center">
                  Join the waitlist and be the first to experience Oros
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  >
                    Join Waitlist
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
                <p className="text-gray-300">
                  We'll notify you when Oros launches
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-md mx-auto mt-12">
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/creator" className="text-purple-400 hover:text-purple-300">
              Creator Portal
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/business" className="text-purple-400 hover:text-purple-300">
              Business Portal
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/shared" className="text-purple-400 hover:text-purple-300">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
