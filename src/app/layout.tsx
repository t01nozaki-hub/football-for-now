import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoLines = Noto_Sans_JP({ 
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "football for now | 欧州サッカーを最速で把握",
  description: "プレミアリーグ、ラ・リーガ、ブンデスリーガなど欧州主要リーグの順位表と試合スケジュールを最速でチェック。日本人選手の活躍も一目でわかります。",
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

