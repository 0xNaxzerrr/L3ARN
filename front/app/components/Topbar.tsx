'use client';

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function TopBar() {
  return (
    <div className="flex items-center justify-end h-16 px-6 border-b border-gray-700/50 bg-[#1a1b23]">
      <Button 
        variant="outline" 
        className="text-blue-400 border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-300"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    </div>
  );
}
