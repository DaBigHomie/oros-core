export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'creator' | 'business' | 'supporter';
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  hashtags: string[];
  budget: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: Date;
  businessId: string;
}

export interface Creator {
  id: string;
  userId: string;
  hashtags: string[];
  earnings: number;
  videos: Video[];
}

export interface Video {
  id: string;
  url: string;
  title: string;
  hashtags: string[];
  views: number;
  earnings: number;
}

export interface Match {
  id: string;
  creatorId: string;
  campaignId: string;
  score: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  commission: number;
  status: 'pending' | 'paid';
}
