'use client';

import dynamic from 'next/dynamic';

// Dynamically import the main experience to avoid SSR issues
const MainExperience = dynamic(() => import('@/components/3D/MainExperience'), { ssr: false });

export default function ClientPortal() {
  return <MainExperience />;
}