import type { Metadata } from 'next';
import ChatPageClient from './_ChatPageClient';

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Ask Huzaifa\'s AI assistant anything about his skills, projects, and experience. Powered by Google Gemini and RAG.',
};

export default function ChatPage() {
  return <ChatPageClient />;
}
