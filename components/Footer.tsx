import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="footer mt-auto w-full">
      <div className="page_container py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/images/logo.svg"
                alt="GoPrompt"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
              <span className="font-satoshi text-lg font-semibold text-white">
                GoPrompt
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              The open prompt hub for AI builders. Discover proven prompts,
              share your own, and level up every workflow — free forever.
            </p>
          </div>

          <div>
            <h4 className="footer_heading">Platform</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/feed" className="footer_link">
                  Browse feed
                </Link>
              </li>
              <li>
                <Link href="/create-prompt" className="footer_link">
                  New prompt
                </Link>
              </li>
              <li>
                <Link href="/profile" className="footer_link">
                  Your profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer_heading">Connect</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://github.com/Sanjaya-Danushka/GoPrompt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer_link"
                >
                  Star on GitHub
                </a>
              </li>
              <li>
                <a href="mailto:dsanjaya712@gmail.com" className="footer_link">
                  Say hello
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer_bottom">
          <p className="text-sm text-gray-500">
            © {year} GoPrompt. Crafted for the AI-native generation.
          </p>
          <p className="text-sm text-gray-500">
            Copy. Create. Share.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
