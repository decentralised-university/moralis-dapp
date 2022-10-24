import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import Moralis from 'moralis';
import type { NextPage } from 'next';
import { EvmChain } from '@moralisweb3/evm-utils';
import { getSession } from 'next-auth/react';


const HomePage: NextPage = () => {






  return (
    <Default pageName="Home">
      <Home />
    </Default>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/home',
              permanent: false,
          },
      };
  }

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: EvmChain.GOERLI,
      address: session.user.address,
      tokenAddress: '0x4f2F874eb70E7B9406CCcDf1070eC7c757fe2381',
  })

  if ( nftList.raw.total > 0 ) {
      return { 
          redirect: {
              destination: '/protected',
              permanent: false,
          },
      };
  }
}
export default HomePage;
