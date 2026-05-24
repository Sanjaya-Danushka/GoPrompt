import { Geist, Geist_Mono } from "next/font/google"

import { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Footer from "@components/Footer"
import Nav from "@components/Nav"
import Provider from "@components/Provider"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "GoPrompt — Discover & Share AI Prompts",
  description:
    "Publish and discover battle-tested AI prompts for ChatGPT, Claude, and more. Copy in one click. Free and open.",
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
      <body className="min-h-screen bg-transparent text-gray-900 antialiased">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="relative z-10 flex min-h-screen flex-col">
            <ThemeProvider>
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </div>
        </Provider>
      </body>
    </html>
  )
}
