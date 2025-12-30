'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Referral {
  id: string;
  name: string;
  type: 'creator' | 'business';
  joinDate: string;
  commission: number;
  status: 'pending' | 'paid';
}

export default function SharedDashboard() {
  const [referrals] = useState<Referral[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      type: 'creator',
      joinDate: '2024-12-15',
      commission: 25.50,
      status: 'paid',
    },
    {
      id: '2',
      name: 'FitLife Brands',
      type: 'business',
      joinDate: '2024-12-20',
      commission: 150.00,
      status: 'paid',
    },
    {
      id: '3',
      name: 'Mike Chen',
      type: 'creator',
      joinDate: '2024-12-28',
      commission: 12.75,
      status: 'pending',
    },
  ]);

  const [referralCode] = useState('OROS-REF-ABC123');
  const [copied, setCopied] = useState(false);

  const totalEarnings = referrals
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.commission, 0);
  
  const pendingEarnings = referrals
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.commission, 0);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://oros.app/join?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supporter Dashboard</h1>
          <p className="text-gray-600">Earn micro-commissions by referring creators and businesses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Earned</div>
            <div className="text-3xl font-bold text-green-600">${totalEarnings.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-3xl font-bold text-orange-600">${pendingEarnings.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Referrals</div>
            <div className="text-3xl font-bold text-blue-600">{referrals.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active This Month</div>
            <div className="text-3xl font-bold text-purple-600">
              {referrals.filter(r => new Date(r.joinDate).getMonth() === new Date().getMonth()).length}
            </div>
          </div>
        </div>

        {/* Referral Link Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow p-8 mb-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Your Referral Link</h2>
            <p className="mb-6">Share this link to earn 3% commission on all transactions</p>
            <div className="bg-white/20 backdrop-blur-lg rounded-lg p-4 flex items-center gap-4">
              <code className="flex-1 text-left">
                https://oros.app/join?ref={referralCode}
              </code>
              <button
                onClick={copyReferralCode}
                className="bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                📱 Share on Twitter
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                💬 Share on Facebook
              </button>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg">
                📧 Email Link
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-lg font-bold mb-2">Share Your Link</h3>
            <p className="text-gray-600 text-sm">
              Share your unique referral link with creators and businesses
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-lg font-bold mb-2">They Join & Earn</h3>
            <p className="text-gray-600 text-sm">
              When they sign up and make transactions on Oros
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-lg font-bold mb-2">You Earn 3%</h3>
            <p className="text-gray-600 text-sm">
              Get 3% micro-commission on all their platform transactions
            </p>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Referral History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Commission</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(referral => (
                  <tr key={referral.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{referral.name}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          referral.type === 'creator'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {referral.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(referral.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      ${referral.commission.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          referral.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdraw Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold mb-1">Ready to withdraw?</h3>
              <p className="text-gray-600 text-sm">
                Minimum withdrawal: $50.00
              </p>
            </div>
            <button
              disabled={totalEarnings < 50}
              className={`px-6 py-3 rounded-lg font-medium ${
                totalEarnings >= 50
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Withdraw ${totalEarnings.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
