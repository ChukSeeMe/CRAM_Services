import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work & Updates | CRAM Services Group',
  description: 'View completed projects, client case studies, testimonials, and company updates across AI automation, software engineering, detailing, and community impact.',
  keywords: ['CRAM Portfolio', 'Case Studies', 'AI Projects', 'Car Detailing Results', 'CRAM News', 'Before & After Details'],
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
