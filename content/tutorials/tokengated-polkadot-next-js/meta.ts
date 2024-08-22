export const meta = {
  title: "Building a Tokengated Website with Polkadot.js and Next.js",
  description:
    "How to write a tokengated website with polkadot.js API and next.js",
  tags: ["polkadot.js", "next.js", "tokengate", "authentication"],
  keywords: ["polkadot.js", "next", "authentication", "tokengated"],
  level: "intermediate",
  duration: "3h",
  category: "Web Development",
  sections: [
    { fileName: "0-intro", title: "Introduction" },
    { fileName: "1-setup", title: "Implementation" },
    {
      fileName: "2-connecting-to-the-wallet-browser-extension",
      title: "Connecting to the wallet browser extension"
    },
    { fileName: "3-conclusion", title: "Conclusion" }
  ],
  learnings: [
    "To build a nice user interface for account selection",
    "How to use the polkadot browser extension with next.js",
    "How to write a convenient hook to just `usePolkadotExtension`",
    "How to use `Context` and a `ContextProvider` to make all accounts available to your components",
    "How to work with next-auth to create a custom `CredentialsProvider` that",
    "authenticates users based on their signature"
  ],
  prerequisites: [
    "Basic react + next.js knowledge",
    "Basic knowledge of JSON Web Tokens (JWT)",
    "Basic knowledge of the polkadot js API"
  ]
};
