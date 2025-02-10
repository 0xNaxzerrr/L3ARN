import type { AppProps } from 'next/app';
import Layout from '@/components/layout/layout';

import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ESGI, config } from '../wagmi';
import { Toaster } from "@/components/ui/toaster"

const client = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (

    <WagmiProvider config={config}>
    <QueryClientProvider client={client}>
      <RainbowKitProvider initialChain={ESGI}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
        </Layout> 
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  );
}
export default MyApp;
