import ToolsClient from './ToolsClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI Tools Directory | THE D[AI]LY BRIEF',
  description: 'Comprehensive directory of AI tools, platforms, and services. Find the best AI solutions for your business across all categories and domains.',
};

export default function ToolsPage() {
  return (
    <Suspense fallback={<div>Loading tools...</div>}>
      <ToolsClient />
    </Suspense>
  );
}
