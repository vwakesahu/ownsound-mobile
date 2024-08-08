import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ownSoundContractABI, ownSoundContractAddress } from "@/utils/contract";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { Contract } from "ethers";
import { motion } from "framer-motion";

export function RentAlert({ metadata }) {
  const { authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const w0 = wallets[0];
  console.log(metadata);
  const handleRent = async (id) => {
    const provider = await w0?.getEthersProvider();
    if (!provider) {
      throw new Error("Provider is not available");
    }

    const signer = await provider.getSigner();
    if (!signer) {
      throw new Error("Signer is not available");
    }
    const contract = new Contract(
      ownSoundContractAddress,
      ownSoundContractABI,
      signer
    );

    const res = await contract.setRentInfo(id, { gasLimit: 1000000 });
    console.log(res);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 border dark:text-white text-black font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
        >
          Rent Now
        </motion.button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rent {metadata.name}</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <Button onClick={() => handleRent(metadata.id)}>Rent</Button>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
