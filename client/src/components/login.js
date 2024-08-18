import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LogOutIcon, Copy, Check } from "lucide-react";
import { truncateAddress } from "@/utils/truncateAddress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import { ModeToggle } from "@/theme/theme-toggle";
import { toast } from "sonner";

const Login = ({ w0 }) => {
  const { login, authenticated, logout } = usePrivy();
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    if (w0?.address) {
      navigator.clipboard.writeText(w0.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Address copied to clipboard");
    }
  };

  return (
    <div className="my-4">
      {authenticated ? (
        <div className="flex items-center gap-2">
          <div>
            <Button variant="outline" className="w-7 p-0" onClick={copyAddress}>
              {copied ? <Check className="w-3" /> : <Copy className="w-3" />}
            </Button>
          </div>
          <DropdownMenu className="w-full">
            <DropdownMenuTrigger className="w-full bg-primary rounded-md">
              <div className="py-2 flex items-center justify-between px-4 w-full">
                <div>
                  <Image
                    src={"/icons/connect-wallet.svg"}
                    width={20}
                    height={20}
                    alt="wallet"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-white">
                    {w0?.address && truncateAddress(w0.address, 4, 4)}
                  </p>
                  <Image
                    src={"/icons/down-arrow.svg"}
                    width={10}
                    height={10}
                    alt="dropdown arrow"
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[12rem]">
              <DropdownMenuItem onClick={logout}>
                <div className="flex items-center justify-between w-full">
                  <p>Logout</p>
                  <LogOutIcon className="w-4" />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      ) : (
        <Button className="w-full" onClick={login}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default Login;
