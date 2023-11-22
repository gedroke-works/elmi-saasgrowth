import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function SpeakingSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

function Appearance({
  title,
  description,

  cta,
  href,
}: {
  title: string
  description: string
  event: string
  cta: string
  href: string
}) {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>

      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Learn more about how I can help your SaaS Business get the results you need.',
}

export default function Speaking() {
  return (
    <SimpleLayout
      title="The keys to SaaS Success is to drive both growth and profitability."
      intro="Here is my prescribed path to achieving this. It all starts with strategy and planification and ends with tactical projects to turn the ideas into reality."
    >
      <div className="space-y-20">
        <SpeakingSection title="Advisory Services">
          <Appearance
            href="https://cal.com/gedroke/discovery"
            title="Growth Strategy Session."
            description="This is a great place to get started. Together we will uncover what are your goals and what prevents you to achieving these goals. At the end of the session you'll have a newfound clarity of your business and know exactly what should be done next."
            event=""
            cta="Book an appointment"
          />
          <Appearance
            href="https://cal.com/gedroke/discovery"
            title="Full Growth Machine."
            description="This is my flagship offering, addressing all aspects of a repeatable, scalable and profitable growth machine to implement in your business. It is constituted of 5 modules : from a repeatable sales motion to a scalable business. At the end of the program you'll have all the keys to turn your SaaS into a cash-generating monster (Limited Seats). "
            event=""
            cta="Book an appointment"
          />
        </SpeakingSection>
        <SpeakingSection title="Building Services">
          <Appearance
            href="https://cal.com/gedroke/discovery"
            title="SaaS Email System."
            description="The very first sales and marketing tool you should build is a complete SaaS Email Ecosystem. A successful SaaS is able to turn visitors into paying customers into brand advocates. The process for that requires a well-crafted system that will handles new business as well as retaining and expand new customers. The system is the core of your sales, marketing and customer success activities."
            event=""
            cta="Book an appointment"
          />
          <Appearance
            href="https://cal.com/gedroke/discovery"
            title="Traffic Magnet System."
            description="You want to grow your authority and your positioning inside a market. This is the first step of acquiring new customers and take the first position in the mind of your prospects. This traffic will be the fuel of the core i.e the SaaS Email System."
            event=""
            cta="Book an appointment"
          />
          <Appearance
            href="https://cal.com/gedroke/discovery"
            title="Lead Capture System."
            description="You drive traffic to your landing pages and websites but to have a chance to sell them your solution you want to get their permission to sell them. All of this is done through this system. "
            event=""
            cta="Book an appointment"
          />
        </SpeakingSection>
      </div>
    </SimpleLayout>
  )
}
