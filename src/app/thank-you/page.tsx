import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import clsx from 'clsx'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'You’re subscribed',
  description: 'Thanks for subscribing to my newsletter.',
}

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function ThankYou() {
  return (
    <SimpleLayout
      title="Thanks for subscribing."
      intro="I hope you'll get tons of value from my emails and, feel free to engage with me in the reply or on social media. I will give you all the information you need inside the welcome message you are about to receive. Make sure to check the spam folder if you don't find it and white list my name to miss nothing. See you in the inbox!"
    >
      <SocialLink href="https://twitter.com/mhadri_el" icon={TwitterIcon}>
        Follow on Twitter
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/ibrahim-el-mhadri-341a1b194/"
        icon={LinkedInIcon}
        className="mt-4"
      >
        Follow on LinkedIn
      </SocialLink>
    </SimpleLayout>
  )
}
