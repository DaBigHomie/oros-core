import type { Campaign, Creator, Match } from '@/types';

/**
 * Calculate match score between creator hashtags and campaign hashtags
 * Uses Jaccard similarity coefficient
 */
export function calculateMatchScore(
  creatorHashtags: string[],
  campaignHashtags: string[]
): number {
  const creatorSet = new Set(creatorHashtags.map(h => h.toLowerCase()));
  const campaignSet = new Set(campaignHashtags.map(h => h.toLowerCase()));
  
  const intersection = new Set(
    [...creatorSet].filter(x => campaignSet.has(x))
  );
  const union = new Set([...creatorSet, ...campaignSet]);
  
  if (union.size === 0) return 0;
  
  return (intersection.size / union.size) * 100;
}

/**
 * Find matching campaigns for a creator (Tinder-style)
 */
export function findMatchesForCreator(
  creator: Creator,
  campaigns: Campaign[],
  minScore: number = 30
): Match[] {
  const matches: Match[] = [];
  
  campaigns.forEach(campaign => {
    if (campaign.status !== 'active') return;
    
    const score = calculateMatchScore(creator.hashtags, campaign.hashtags);
    
    if (score >= minScore) {
      matches.push({
        id: `${creator.id}-${campaign.id}`,
        creatorId: creator.id,
        campaignId: campaign.id,
        score,
        status: 'pending',
      });
    }
  });
  
  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
}

/**
 * Find matching creators for a campaign
 */
export function findMatchesForCampaign(
  campaign: Campaign,
  creators: Creator[],
  minScore: number = 30
): Match[] {
  const matches: Match[] = [];
  
  creators.forEach(creator => {
    const score = calculateMatchScore(creator.hashtags, campaign.hashtags);
    
    if (score >= minScore) {
      matches.push({
        id: `${creator.id}-${campaign.id}`,
        creatorId: creator.id,
        campaignId: campaign.id,
        score,
        status: 'pending',
      });
    }
  });
  
  // Sort by score descending
  return matches.sort((a, b) => b.score - a.score);
}

/**
 * Get recommended hashtags based on existing ones
 */
export function getRecommendedHashtags(
  currentHashtags: string[],
  allHashtags: string[]
): string[] {
  // Simple recommendation: return hashtags not in current list
  const currentSet = new Set(currentHashtags.map(h => h.toLowerCase()));
  return allHashtags
    .filter(h => !currentSet.has(h.toLowerCase()))
    .slice(0, 10);
}
