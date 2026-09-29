import type { Metadata } from 'next';
import { LegalRoute, legalMetadata } from '@/components/layout/LegalRoute';
import { privacy } from '@/content/legal';

export const metadata: Metadata = legalMetadata(privacy, '/privacy');

const siblings = [
  { label: 'Terms', href: '/terms' },
  { label: 'Security', href: '/security' },
] as const;

export default function PrivacyPage() {
  return <LegalRoute page={privacy} siblings={siblings} />;
}
