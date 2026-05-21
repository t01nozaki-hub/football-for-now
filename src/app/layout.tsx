import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoLines = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://footballfornow.com'),
  title: "football for now | 欧州サッカーを最速で把握",
  description: "プレミアリーグ、ラ・リーガ、ブンデスリーガなど欧州主要リーグの順位表と試合スケジュールを最速でチェック。日本人選手の活躍も一目でわかります。",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'football for now | 欧州サッカーを最速で把握',
    description: '欧州主要リーグの最新順位、試合結果、日本人選手の活躍を最速でチェック。',
    url: 'https://footballfornow.com',
    siteName: 'football for now',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'football for now | 欧州サッカーを最速で把握',
    description: '欧州主要リーグの最新順位、試合結果、日本人選手の活躍を最速でチェック。',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQCE7RTNKY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQCE7RTNKY');
          `}
        </Script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4556999763350192"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "football for now",
              "url": "https://footballfornow.com",
              "description": "欧州主要リーグの最新順位、試合結果、日本人選手の活躍を最速でチェックできるサッカーポータルサイト。",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://footballfornow.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${notoLines.className} antialiased`}>
        {children}
      </body>
    </html>

  );
}

