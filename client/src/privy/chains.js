import { toast } from "sonner";

export const educhainConfig = {
  id: 656476,
  network: "Educhain",
  name: "Educhain",
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://open-campus-codex-sepolia.drpc.org"],
    },
    public: {
      http: ["https://open-campus-codex-sepolia.drpc.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
};
