'use client';

import { CommunicationHub } from '@/app/components/Communication/CommunicationHub';

export default function CommunicationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Communication Hub</h1>
      <CommunicationHub />
    </div>
  );
} 