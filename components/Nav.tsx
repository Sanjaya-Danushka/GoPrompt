/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react"
import { Button } from "./ui/button"

const Nav = () => {
  // const { data: session } = useSession()
  const isLog = true

  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null)

  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    fetchProviders()
  }, [])

  return (
    <nav className={"flex-between mb-16 w-full px-10 pt-3"}>
      <Link href={"/"} className={"flex-center flex gap-2"}>
        <Image
          src={"/assets/images/logo.svg"}
          alt={"GoPrompt Logo"}
          width={30}
          height={30}
          className={"object-contain"}
        />
        <p className={"logo_text"}>GoPrompt</p>
      </Link>
      {/* Desktop Navigation */}
      <div className={"hidden sm:flex"}>
        {
          /* {session?.user ? */ isLog ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className={"black_btn"}>
                Create Post
              </Link>
              <Button
                type="button"
                onClick={() => signOut()}
                className="outline_btn"
              >
                Sign Out
              </Button>
              <Link href="/profile">
                <Image
                  src={"/assets/images/profile.svg"}
                  alt={"Profile"}
                  width={37}
                  height={37}
                  className={"rounded-full"}
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </Button>
                ))}
            </>
          )
        }
      </div>
      {/* mobile Navigation */}
      <div className={"relative flex sm:hidden"}>
        {
          /* {session?.user ? */ isLog ? (
            <div className="flex">
              <Image
                src={"/assets/images/profile.svg"}
                alt={"Profile"}
                width={37}
                height={37}
                className={"rounded-full"}
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <Button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut()
                    }}
                    className="black_btn mt-5 w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    type="button"
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </Button>
                ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
