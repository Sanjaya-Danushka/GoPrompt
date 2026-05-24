import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer mt-auto w-full border-t border-gray-200/80 bg-white/60 backdrop-blur-xl">
      <div className="app py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/images/logo.svg"
                alt="GoPrompt"
                width={28}
                height={28}
              />
              <span className="font-satoshi text-lg font-semibold text-gray-900">
                GoPrompt
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-600">
              Discover, create, and share AI prompts with a growing community of
              creators and builders.
            </p>
          </div>

          <div>
            <h4 className="font-satoshi text-sm font-semibold uppercase tracking-wider text-gray-900">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/#prompts" className="footer_link">
                  Explore prompts
                </Link>
              </li>
              <li>
                <Link href="/create-prompt" className="footer_link">
                  Create prompt
                </Link>
              </li>
              <li>
                <Link href="/profile" className="footer_link">
                  My profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-satoshi text-sm font-semibold uppercase tracking-wider text-gray-900">
              Community
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer_link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:hello@goprompt.app" className="footer_link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200/80 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {year} GoPrompt. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built for the next generation of AI creators.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
