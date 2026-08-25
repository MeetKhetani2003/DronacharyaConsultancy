import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Faq from '@/models/Faq';

const FAQS = [
  {
    q: "Is NEET mandatory for MBBS admission abroad?",
    a: "Yes. As per the National Medical Commission, qualifying NEET-UG is compulsory for every Indian student who wishes to study MBBS abroad and later practise in India. We help you use even a modest NEET score effectively.",
  },
  {
    q: "Are the universities you recommend recognised by NMC and WHO?",
    a: "We only work with universities listed with the National Medical Commission and the World Directory of Medical Schools (WDOMS/WHO). Every recognition document is shown to parents in writing before an application is filed.",
  },
  {
    q: "What is the total cost of studying MBBS abroad?",
    a: "The complete course typically ranges between 15 - 40 Lakh, which includes TF (Tuition Fee) + Food + Hostel. Kazakhstan and Russia are the most economical; Georgia and Mauritius sit at the premium end.",
  },
  {
    q: "Will I get help with education loans?",
    a: "Yes. We coordinate with nationalised and private banks, prepare the complete loan file, and guide families on collateral, margin money and disbursement schedules.",
  },
  {
    q: "How does Dronacharya help with FMGE / NExT preparation?",
    a: "Our alumni network and academic partners provide a year-wise licensing roadmap from the first year, along with test-series recommendations and mentorship from doctors who have cleared the screening exam.",
  },
  {
    q: "Do you also handle MBBS admissions inside India?",
    a: "Absolutely. We manage All India Quota (MCC), state counselling, deemed universities, private and NRI quota admissions with complete choice-filling strategy and seat-locking guidance.",
  },
  {
    q: "What support is available after I reach the university?",
    a: "On-ground coordinators assist with registration, hostel check-in, residence permits and visa renewals. Parents receive periodic academic and wellbeing updates throughout the course.",
  },
  {
    q: "How do I start? Is the first consultation free?",
    a: "Yes — the first counselling session is completely free, in person at our Bhilwara office or online. Bring your NEET scorecard and Class XII marksheet and you will leave with a written shortlist.",
  },
];

export async function GET() {
  await connectToDatabase();
  await Faq.deleteMany({});
  await Faq.insertMany(FAQS);
  return NextResponse.json({ success: true, message: 'Seeded FAQS' });
}
