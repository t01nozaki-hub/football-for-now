import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '日本人選手名鑑 | 欧州サッカー | football for now',
  description: '欧州リーグで活躍する日本人サッカー選手の最新情報。所属チーム、スタッツ、プロフィールを網羅。',
  alternates: {
    canonical: '/japanese-players/',
  },
};

export default function JapanesePlayersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
