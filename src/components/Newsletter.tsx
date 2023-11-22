'use client'

import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { format } from 'url'

import { Button } from './ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}
export function Newsletter() {
  // Initialize state variables
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Initialize Router
  const router = useRouter()
  // Define the form data types.
  type FormData = {
    firstName: string
    email: string
  }

  // Create a form schema using the zod library.
  const formSchema = z.object({
    firstName: z
      .string()
      .min(
        2,
        "Un prénom trop court, c'est bien trop banal. Offrez-nous un nom qui égale un régal!",
      )
      .max(
        15,
        'Prénom envoûtant, aux rimes chatoyantes. À 15 caractères, une harmonie éclatante et étincelante !',
      ),
    email: z
      .string()
      .email(
        'Email égaré, erreurs multipliées. Corrigez-le, suivez la voie éclairée!',
      ),
  })

  // Initialize the form with react-hook-form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      email: '',
    },
  })

  // Helper function to capitalize the first character of each word
  const capitalizeWords = (text: string): string => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Handle form submission.
  const onSubmit = async (data: FormData): Promise<void> => {
    const { firstName, email }: FormData = data

    try {
      console.log(formSubmitted)
      // Validate form data using Zod schema.
      formSchema.parse(data)

      // Check if the email already exists in the audience
      const checkResponse = await fetch(
        `/api/mailchimp/submit?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
        },
      )
      const { exists } = await checkResponse.json()

      if (exists) {
        form.setError('email', {
          message:
            'Votre email, dans les limbes égaré. Son existence est deja certifié.',
        })
        return
      }

      // Create a new variable with formatted data
      const formattedData: FormData = {
        firstName: capitalizeWords(firstName),
        email: email.toLowerCase(),
      }

      // If the email doesn't exist yet, add the new member
      const response = await fetch('/api/mailchimp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData), // Use the modified data object instead.
      })

      if (response.ok) {
        // Check if the email have been created in the audience
        const checkResponse = await fetch(
          `/api/mailchimp/submit?email=${encodeURIComponent(email)}`,
          {
            method: 'GET',
          },
        )
        const { exists } = await checkResponse.json()

        if (exists) {
          // Reset the form state after successful submission
          form.reset()

          // Redirect to the thank-you page
          router.replace(
            format({
              pathname: '/thank-you',
              query: { fromForm: 'true' },
            }),
          )

          // Set the form submit variable to true because it is successful
          setFormSubmitted(true)

          console.log(formSubmitted)
          return
        }
      } else {
        throw new Error('Failed to add contact to the Mailchimp Audience')
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten()
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            form.setError(field as keyof FormData, { message: messages[0] })
          }
        })
      } else if (
        error instanceof Error &&
        error.message.includes('looks fake or invalid')
      ) {
        const errorMessage =
          'Invalid email address. Please enter a valid email.'
        form.setError('email', { message: errorMessage })
      } else {
        // Handle other type of errors
        console.error('An error occurred:', error)

        // Log a user-friendly error message without exposing sensitive details
        console.error('An error occurred. Please try again.')
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
      >
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <MailIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Growth Machine Chronicle</span>
        </h2>
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            Receive my best advice on crafting powerful growth strategies for
            your SaaS venture, delivered straight to your inbox. Unsubscribe at
            any time.
          </p>
          <ul className="mt-4 flex flex-col gap-1">
            <li className="flex gap-2">
              <CheckIcon className="mt-1 h-4 w-4 flex-none" />
              My latest thoughts on the SaaS World.
            </li>
            <li className="flex gap-2">
              <CheckIcon className="mt-1 h-4 w-4 flex-none" /> Sales and Growth
              marketing insights.
            </li>

            <li className="flex gap-2">
              <CheckIcon className="mt-1 h-4 w-4 flex-none" /> Comprehensive
              in-depth guides.
            </li>

            <li className="flex gap-2">
              <CheckIcon className="mt-1 h-4 w-4 flex-none" /> And more...
            </li>
          </ul>
        </div>

        <div className="mr-6 mt-6 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="My name is..."
                    {...field}
                    className={`min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm ${
                      form.formState.errors.firstName
                        ? 'border-red-500'
                        : 'border-zinc-300'
                    }`}
                  />
                </FormControl>
                {form.formState.errors.firstName && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.firstName.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Here is my best email address..."
                    {...field}
                    className={`min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm ${
                      form.formState.errors.email
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* <input
            type="text"
            id="name"
            placeholder="My name is..."
            aria-label="First Name"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          />
          <input
            type="email"
            id="email"
            placeholder="Here is my best email address..."
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
          /> */}
          <Button type="submit" className=" flex-none">
            Count me In!
          </Button>
        </div>
      </form>
    </Form>
  )
}
