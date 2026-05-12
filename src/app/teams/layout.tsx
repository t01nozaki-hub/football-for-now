import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '欧州主要クラブ一覧 | football for now',
  description: 'プレミアリーグ、ラ・リーガ、ブンデスリーガなどの主要クラブ情報を網羅。各チームの詳細データや所属選手、日程をチェック。',
  alternates: {
    canonical: '/teams/',
  },
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
