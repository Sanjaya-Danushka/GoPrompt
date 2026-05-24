"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react"
import { Menu, X, Plus, LogOut } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
]

const Nav = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    getProviders().then(setProviders)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const handleChange = () => {
      if (media.matches) setMobileOpen(false)
    }
    handleChange()
    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="nav_shell sticky top-0 z-50 w-full">
      <nav className="nav_inner">
        <Link href="/" className="nav_brand">
          <Image
            src="/assets/images/logo.svg"
            alt="GoPrompt"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="nav_brand_text">GoPrompt</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav_item ${isActive(href) ? "nav_item_active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              <Link href="/create-prompt" className="nav_cta">
                <Plus className="h-4 w-4" />
                New Prompt
              </Link>
              <Link
                href="/profile"
                className={`nav_avatar_wrap ${isActive("/profile") ? "nav_avatar_active" : ""}`}
              >
                <Image
                  src={session.user.image || "/assets/images/profile.svg"}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="nav_avatar"
                />
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="nav_signout"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                type="button"
                onClick={() => signIn(provider.id)}
                className="nav_cta"
              >
                Sign in with Google
              </button>
            ))
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav_menu_btn"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="nav_mobile_panel md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav_mobile_link ${isActive(href) ? "nav_item_active" : ""}`}
            >
              {label}
            </Link>
          ))}

          {session?.user ? (
            <>
              <Link href="/profile" className="nav_mobile_user">
                <Image
                  src={session.user.image || "/assets/images/profile.svg"}
                  alt=""
                  width={40}
                  height={40}
                  className="nav_avatar"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </Link>
              <Link href="/create-prompt" className="nav_cta w-full justify-center">
                <Plus className="h-4 w-4" />
                New Prompt
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="nav_mobile_signout"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                type="button"
                onClick={() => signIn(provider.id)}
                className="nav_cta w-full justify-center"
              >
                Sign in with Google
              </button>
            ))
          )}
        </div>
      )}
    </header>
  )
}

export default Nav
