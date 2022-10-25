import { Box, Heading, Text, Square, Button, Grid, GridItem, useColorModeValue } from "@chakra-ui/react"
import { Default } from "components/layouts/Default";
import { getSession, GetSessionParams } from 'next-auth/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';


function Protected({ }) {
    const bgGridItem = useColorModeValue('yellow.100', 'red.100')
    const color = useColorModeValue('gray', 'gray')
    const borderColor = useColorModeValue('gray.200', 'gray.700')
    const boxGradient = useColorModeValue('linear(to-br, gray.200, white)','linear(to-br, gray.900, gray.600)')
    const boxColor = useColorModeValue('red.100','red.900')
    const textGradient = useColorModeValue('linear(to-br, gray.600, gray.900)','linear(to-br, gray.100, gray.300)')

    return (
        <Default pageName="protected">
            <Box mb={16}>
                <Heading size={"2xl"} mb={"8"}>Exclusive content</Heading>
                <Heading size={"md"}>Nice, you have the Access Pass! This content can only be accessed by holding the NFT Access Pass!</Heading>
            </Box>

            <Grid
            // h='800px'
            // w='max'
            templateRows='repeat(1, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={10}
            >
                <GridItem colSpan={2} bgGradient={boxGradient} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg'>
                    <Box p={5}>
                        <Heading size="lg">
                        Claim your first DU Points!
                        </Heading>
                        <Text mt={4} mb={8} fontSize='lg'>
                        You can earn more points by contributing to the University community, by supporting others with helpful posts and comments in forums, creating learning guides, and much more to come.
                        </Text>
                        <Square mt={4}>
                        <Button colorScheme="purple" _hover={{ bg: 'orange'}} size="lg">Claim Points</Button>
                        </Square>
                    </Box>
                </GridItem>
            </Grid>
        </Default>
    );
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
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
        tokenAddress: '0x4f2F874eb70E7B9406CCcDf1070eC7c757fe2381',
    })

    if ( nftList.raw.total == 0 ) {
        return { 
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}

export default Protected;