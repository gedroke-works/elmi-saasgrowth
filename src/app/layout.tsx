import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Ibrahim El Mhadri',
    default:
      'Ibrahim El Mhadri | Conseiller et Growth Marketer pour les Entreprises SaaS',
  },
  description:
    'Ibrahim El Mhadri, expert en growth marketing pour les entreprises SaaS. Conseils stratégiques pour maximiser croissance et rentabilité. Découvrez analyses avisées et solutions pratiques pour propulser votre entreprise vers le succès.',
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
      <GoogleAnalytics GA_MEASUREMENT_ID='G-0000000000'/>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>
              {children}
              <CookieBanner/>
              </Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
