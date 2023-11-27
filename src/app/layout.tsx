import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieBanner from '@/components/CookieBanner'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Ibrahim El Mhadri',
    default: 'Ibrahim El Mhadri | Advisor and Growth Marketer for SaaS Firms',
  },
  description:
    "Ibrahim El Mhadri, Expert in growth marketing for SaaS Firms. If you want to bring success to your SaaS Business, you must drive both growth and profitability. Easy to say, hard to achieve. This is why you'll get from me actionable insigth that will make an impact.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-0000000000" />
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>
              {children}
              <CookieBanner />
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
