import { polygonAmoy } from "./chains";

export const privyConfig = {
  appId: "cm00s5izi0007itpy18u8vvtl",
  config: {
    logo: "https://your.logo.url",
    appearance: { theme: "dark" },
    loginMethods: ["wallet"],
    appearance: {
      walletList: ["metamask", "detected_wallets", "rainbow"],
      theme: "dark",
    },
    defaultChain: polygonAmoy,
    supportedChains: [polygonAmoy],
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
    },
  },
};
