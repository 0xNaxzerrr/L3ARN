// pages/admin.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgramNFTForm } from "@/components/form/ProgramNFTForm";
import { PerformanceNFTForm } from "@/components/form/PerformanceNFTForm";
import { UpdateProgramNFTForm } from "@/components/form/updateProgramNFTForm";
import { UpdatePerformanceNFTForm } from "@/components/form/UpdatePerformanceNFTForm";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Administration des NFTs ESGI</h1>

      <Tabs defaultValue="mintProgram">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="mintProgram">Minter NFT Programme</TabsTrigger>
          <TabsTrigger value="mintPerformance">
            Minter NFT Performance
          </TabsTrigger>
          <TabsTrigger value="updateProgram">
            Mettre à jour NFT Programme
          </TabsTrigger>
          <TabsTrigger value="updatePerformance">
            Mettre à jour NFT Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mintProgram">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Minter un NFT de Programme
            </h2>
            <ProgramNFTForm />
          </div>
        </TabsContent>

        <TabsContent value="mintPerformance">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Minter un NFT de Performance
            </h2>
            <PerformanceNFTForm />
          </div>
        </TabsContent>

        <TabsContent value="updateProgram">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Mettre à jour un NFT de Programme
            </h2>
            <UpdateProgramNFTForm />
          </div>
        </TabsContent>

        <TabsContent value="updatePerformance">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Mettre à jour un NFT de Performance
            </h2>
            <UpdatePerformanceNFTForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
