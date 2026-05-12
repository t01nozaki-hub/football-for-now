import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | football for now',
  description: 'football for nowへのお問い合わせ、フィードバックはこちらから。サービス改善のためのご意見をお待ちしております。',
  alternates: {
    canonical: '/contact/',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
