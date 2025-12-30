'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Campaign {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  budget: number;
  status: 'active' | 'paused' | 'completed';
  matches: number;
  conversions: number;
}

export default function BusinessDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Summer Fitness Challenge',
      description: 'Promote our new fitness line',
      hashtags: ['fitness', 'workout', 'health'],
      budget: 5000,
      status: 'active',
      matches: 24,
      conversions: 156,
    },
    {
      id: '2',
      title: 'Wellness Brand Partnership',
      description: 'Collaboration with wellness creators',
      hashtags: ['wellness', 'selfcare', 'mindfulness'],
      budget: 3000,
      status: 'active',
      matches: 18,
      conversions: 92,
    },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    description: '',
    hashtags: '',
    budget: '',
  });

  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalMatches = campaigns.reduce((sum, c) => sum + c.matches, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
  const avgConversionRate = campaigns.length > 0 
    ? (totalConversions / totalMatches * 100).toFixed(1)
    : '0';

  const handleCreateCampaign = () => {
    if (!newCampaign.title || !newCampaign.budget) return;

    const campaign: Campaign = {
      id: String(campaigns.length + 1),
      title: newCampaign.title,
      description: newCampaign.description,
      hashtags: newCampaign.hashtags.split(',').map(h => h.trim()),
      budget: parseFloat(newCampaign.budget),
      status: 'active',
      matches: 0,
      conversions: 0,
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({ title: '', description: '', hashtags: '', budget: '' });
    setShowCreateForm(false);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setCampaigns(campaigns.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Dashboard</h1>
          <p className="text-gray-600">Manage campaigns, track performance, and find creators</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Budget</div>
            <div className="text-3xl font-bold text-blue-600">${totalBudget.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Active Campaigns</div>
            <div className="text-3xl font-bold text-purple-600">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Total Matches</div>
            <div className="text-3xl font-bold text-green-600">{totalMatches}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-3xl font-bold text-orange-600">{avgConversionRate}%</div>
          </div>
        </div>

        {/* Analytics Chart Placeholder */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Campaign Performance</h2>
          <div className="h-64 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-gray-600">Analytics Chart</div>
              <div className="text-sm text-gray-500">Performance metrics visualization</div>
            </div>
          </div>
        </div>

        {/* Campaigns Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Campaigns</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              {showCreateForm ? 'Cancel' : '+ Create Campaign'}
            </button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Campaign Title
                  </label>
                  <input
                    type="text"
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Spring Product Launch"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Describe your campaign..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hashtags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newCampaign.hashtags}
                    onChange={(e) => setNewCampaign({ ...newCampaign, hashtags: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="fitness, wellness, health"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    value={newCampaign.budget}
                    onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="5000"
                  />
                </div>
                <button
                  onClick={handleCreateCampaign}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          )}

          {/* Campaigns List */}
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm">{campaign.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div className="flex gap-2 mb-3">
                  {campaign.hashtags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-600">Budget</div>
                    <div className="font-semibold">${campaign.budget.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Matches</div>
                    <div className="font-semibold">{campaign.matches}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Conversions</div>
                    <div className="font-semibold">{campaign.conversions}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleStatus(campaign.id)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    {campaign.status === 'active' ? 'Pause' : 'Activate'}
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
