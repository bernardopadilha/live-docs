import { Plus_Jakarta_Sans } from "next/font/google"

import './globals.css'

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import Provider from "./provider"

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"], weight: ["200", "500", "700", "800"]
})

export const metadata: Metadata ={
  title: 'LiveDocs',
  description: 'O editor perfeito para sua empresa'
}

export default function RootLayout({ children }: {children: ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3371FF",
          fontSize: '16px',
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen antialiased",
            plus_jakarta_sans
          )}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  )
}
