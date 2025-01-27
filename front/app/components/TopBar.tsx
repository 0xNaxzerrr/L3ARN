'use client';

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function TopBar() {
  return (
    <div className="h-16 px-6 flex items-center justify-end border-b border-gray-800">
      <Button 
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white gap-2"
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    </div>
  );
}
