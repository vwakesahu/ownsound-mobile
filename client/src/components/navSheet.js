import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import Login from "./login";
import { useState } from "react";

export function SheetDemo({ menuItems, selectedLayout, handleClick, w0 }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <Login w0={w0} />
        <motion.div
          className="flex flex-col space-y-6  mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                className={`flex items-center space-x-2 cursor-pointer transition-transform transform ${
                  selectedLayout === item.name.toLowerCase()
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => {
                  setOpen(false);
                  handleClick(item.name);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-6 w-6" />
                <span>{item.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
