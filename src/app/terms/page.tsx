import type { Metadata } from 'next';
import { LegalRoute, legalMetadata } from '@/components/layout/LegalRoute';
import { terms } from '@/content/legal';

export const metadata: Metadata = legalMetadata(terms, '/terms');

const siblings = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Security', href: '/security' },
] as const;

export default function TermsPage() {
  return <LegalRoute page={terms} siblings={siblings} />;
}
