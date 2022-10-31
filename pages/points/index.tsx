import { Default } from 'components/layouts/Default';
import { Home } from 'components/templates/home';
import type { NextPage } from 'next';
import { CheckCircleIcon, Icon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, Stack, Box, Text, Grid, GridItem, Button, useColorModeValue, Square, Circle, border } from '@chakra-ui/react';
import { MintNFT } from 'components/modules/MintNFT';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import { getSession } from 'next-auth/react';
import { ClaimPoints } from 'components/modules/ClaimPoints';
import { RiNumber1, RiNumber2 } from 'react-icons/ri';

const Points = ( hasNFT: boolean ) => {

  const address = '0x6d818827046A47db24E08d0E7799E21E384901c4';
  const color = useColorModeValue('gray', 'gray')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const boxGradient = useColorModeValue('linear(to-br, gray.200, white)','linear(to-br, gray.900, gray.600)')
  const textGradient = useColorModeValue('linear(to-br, gray.600, gray.900)','linear(to-br, gray.100, gray.300)')

  return (
      <>
      <Default pageName="Home">
        <Heading 
          size="xl"
          bgColor={color}
          bgClip='text'
          fontWeight='extrabold'
          >
            Welcome To
        </Heading>
        <Heading 
          size="4xl"
          p={1}
          marginBottom={16}
          bgGradient= {textGradient}
          bgClip='text'
          fontWeight='extrabold'
          >
          The Decentralised University
        </Heading>

        <Grid
          templateRows='repeat(1, 1fr)'
          templateColumns='repeat(1, 1fr)'
          gap={10}
        >
          <GridItem colSpan={1} mx={12} bgGradient={boxGradient} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg'>
            <Box p={10}>
              <Heading size='xl'>
                <Square>
                  <Square size="60px" mb={5} borderColor={borderColor} bgColor={borderColor} borderRadius="50%" shadow='base'>
                    <Icon as={ RiNumber2 } color={textGradient} size={'xl'} />
                  </Square>
                </Square>
              </Heading>
              <Heading size="xl">
                Claim 100 free points to get started
              </Heading>
              <Text minH={'100px'} my={4} fontSize='lg'>
                Get access to exclusive content by purchasing the Decentralised University Access Pass!
              </Text>
              <Square >
                <ClaimPoints/>
              </Square>
            </Box>
          </GridItem>
        </Grid>
      </Default>
          </>

  );
};


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
      return {
          redirect: {
              destination: '/',
              permanent: false,
          },
      };
  }

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const nftList = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: EvmChain.GOERLI,
      address: session.user.address,
      tokenAddress: '0x6d818827046A47db24E08d0E7799E21E384901c4',
  })
  
  const hasNFT = Boolean(nftList.raw.total);

  if ( hasNFT === true ) {
      return { 
          redirect: {
              destination: '/protected',
              permanent: false,
          },
      };
  }

  return {
    props: { hasNFT },
  }
}

export default Points;
