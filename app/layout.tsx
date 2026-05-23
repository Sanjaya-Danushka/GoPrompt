import { Geist, Geist_Mono } from "next/font/google"

import { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Nav from "@components/Nav"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "GoPrompt",
  description: "Discover, Create, and Share AI Prompts",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="relative z-10">
          <ThemeProvider>
            <Nav />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
