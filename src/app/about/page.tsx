import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

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

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    "I'm Ibrahim, a French SaaS Advisor guiding firms in the SaaS industry.",
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I{"'"}m Ibrahim, a French SaaS Advisor guiding firms in the
            industry.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <h2 className="text-lg">
              SaaS Startups don{"'"}t often fail because of a lack of innovative
              technology or product viability. No, they struggle because of
              innefective marketing strategies and sales strategies, lack of
              clarity and focus or, poor financial management.
            </h2>

            <p className="mt-2 border-t border-zinc-100 pt-8 dark:border-zinc-700/40">
              <span className="text-xl">Mission</span>
              <br />I{"'"}m on a mission to help SaaS entrepreneurs turn their
              business into a cash-generating monster. Everything starts with
              Principles and Strategy. The most important thing is to define
              where you want to go and how to get there. You{"'"}ll have
              obstacles to overcome but, with the right knowledge and guidance,
              everything is possible.
            </p>
            <p>
              <span className="text-xl">Vision</span>
              <br />I want to be a leading source of strong growth, sales, and
              pricing practices to the entire field and not just for those who
              hire me. I expect to set the bar for the industry.
            </p>

            <p className="mt-2 border-t border-zinc-100 pt-2 dark:border-zinc-700/40">
              {' '}
            </p>
            <p>
              <span className="text-xl">Curiosity</span>
              <br /> The world is plentiful, and we thrive at learning
              everything we{"'"}re interested in. This makes our craft and our
              thoughts truly unique.
            </p>
            <p>
              <span className="text-xl">Growth</span>
              <br /> If we don{"'"}t improve, we die. This statement holds not
              only for any business but for humans too. We constantly hone our
              craft so we can become better every day... one step at a time.
            </p>
            <p>
              <span className="text-xl">Honesty</span>
              <br /> The truth may hurt but I truly believe that we should be
              honest with our thoughts and with the words we share with people.
              It{"'"}s a crucial component of continuous progress.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
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
            <SocialLink
              href="mailto:ibrahim.procopy@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              ibrahim.procopy@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
