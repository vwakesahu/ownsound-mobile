import { educhainConfig } from "./chains";

export const privyConfig = {
  appId: "clz007cw406bz3iq8dwolge41",
  config: {
    logo: "https://your.logo.url",
    appearance: { theme: "dark" },
    loginMethods: ["wallet"],
    appearance: {
      walletList: ["metamask", "detected_wallets", "rainbow"],
      theme: "dark",
    },
    defaultChain: educhainConfig,
    supportedChains: [educhainConfig],
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
    },
  },
};
