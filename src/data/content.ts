import type { BuildingId } from '@/constants/buildings';

export interface ContentEntry {
  title: string;
  kicker: string;
  body: string[];
}

export const CONTENT: Record<BuildingId, ContentEntry> = {
  updt: {
    title: 'UPDT. Soccer Stadium',
    kicker: 'Co-founder & CTO — Update Analytics (UPDT.) · 2026–Present · updt.pro',
    body: [
      'Building an AI-driven soccer analytics platform for clubs, scouts, and academies — taking raw match data and video, turning it into decisions.',
      'ScoutPro: player search, AI chatbot, league scatterplots, side-by-side comparisons, shortlists.',
      'Computer Vision Tracking: automated player and ball tracking from any broadcast or tactical camera feed.',
      'Tactical Pattern Detection: pressing patterns, build-up tendencies, transition sequences.',
      'Automated Match Reports: post-match analysis delivered in hours, not days.',
    ],
  },
  rmaict: {
    title: 'RMAICT Tower',
    kicker: 'AI Engineer Intern — RMAICT International · Kuala Lumpur · May–Aug 2024',
    body: [
      "Used Hugging Face's Donut model to convert 1,000+ receipt images into structured JSON, reducing manual entry by 3 hours.",
      'Initiated a transfer learning project extending the receipt model to invoices, saving another 2 hours.',
    ],
  },
  du: {
    title: 'Delta Upsilon — Pong',
    kicker: 'Pong Baseball Automation App · Nov 2025 – Jan 2026 · React Native · Expo · Supabase · PostgreSQL',
    body: [
      'Built and deployed a cross-platform mobile automation app, actively used by 70+ users across multiple locations.',
      'Scalable Supabase backend with secure auth, real-time data access, and persistent cloud storage.',
      'Replaced a paper-based logging system that required 2+ hours of post-game data entry.',
    ],
  },
};
