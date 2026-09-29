import type { Metadata } from 'next';
import { LegalRoute, legalMetadata } from '@/components/layout/LegalRoute';
import { security } from '@/content/legal';

export const metadata: Metadata = legalMetadata(security, '/security');

const siblings = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

export default function SecurityPage() {
  return <LegalRoute page={security} siblings={siblings} />;
}
