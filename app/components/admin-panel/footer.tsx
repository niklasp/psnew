import Link from "next/link";
import { PoweredByPolkadot } from "../ui/powered-by-polkadot";

export function Footer() {
  return (
    <footer className="py-6 md:py-0 border-t border-border/40 shadow-inner mt-16">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          {/* Inspired by{" "}
          <Link
            href="https://github.com/PolkadotStudy/polkadot.study"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn/ui/sidebar
          </Link>
          ,{" "}
          <Link
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            react.dev
          </Link> */}
          Polkadot Study is open source. Anyone can contribute and become an
          author on{" "}
          <Link
            href="https://github.com/PolkadotStudy/polkadot.study"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
        <PoweredByPolkadot />
      </div>
    </footer>
  );
}
