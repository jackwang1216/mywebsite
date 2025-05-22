'use client';

import { useEffect, useState } from 'react';
import ChatButton from './ChatButton';

export default function JackAI() {
  const [mounted, setMounted] = useState(false);

  // Only render the chat button on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ChatButton />;
}
