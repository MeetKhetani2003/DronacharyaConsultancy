import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import University from '@/models/University';

const UNIVERSITIES = [
  { name: 'MBBS in Mauritius | Fees, Eligibility, Admission Process', country: 'Georgia', flag: '🇬🇪', rank: 'Georgia Rank #1', recognition: 'NMC • WFME • WHO', fees: '$8,000 / year', image: '/media/image-2.jpeg' },
  { name: 'Admission Counselling | MBBS, B.Tech, BBA & MBA Guidance', country: 'Georgia', flag: '🇬🇪', rank: 'Est. 1935', recognition: 'NMC • WHO • ECFMG', fees: '$6,500 / year', image: '/media/image-3.jpeg' },
  { name: 'Biotechnology Admissions | B.Tech Biotechnology, Biomedical Engineering, Bioinformatics & B.Sc. Programs', country: 'Kazakhstan', flag: '🇰🇿', rank: 'Kazakhstan Rank #1', recognition: 'NMC • WHO • WDOMS', fees: '$4,200 / year', image: '/media/image-7.jpeg' },
  { name: 'College Selection Guidance | Career Counselling & Admission Support After 12th', country: 'Kazakhstan', flag: '🇰🇿', rank: 'Est. 1964', recognition: 'NMC • WHO', fees: '$3,900 / year', image: '/media/image-5.jpeg' },
  { name: 'Pharm.D Admissions | Doctor of Pharmacy Course | Admission Guidance', country: 'Bangladesh', flag: '🇧🇩', rank: 'SAARC Quota', recognition: 'NMC • WHO • BMDC', fees: '$8,500 / year', image: '/media/image-9.jpeg' },
  { name: 'MBBS in Philippines | Admission, Fees, Eligibility & Complete Guidance', country: 'Philippines', flag: '🇵🇭', rank: 'CHED Autonomous', recognition: 'NMC • WHO • ECFMG', fees: '$5,200 / year', image: '/media/image-6.jpeg' },
];

export async function GET() {
  await connectToDatabase();
  await University.deleteMany({});
  await University.insertMany(UNIVERSITIES);
  return NextResponse.json({ success: true, message: 'Seeded' });
}
