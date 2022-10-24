import { Box, Heading, Text } from "@chakra-ui/react"
import { Default } from "components/layouts/Default";
import { getSession } from 'next-auth/react';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';


function Protected({ message }) {
    return (
        <Default pageName="protected">
            <Box>
                <Heading size={"2xl"} mb={"8"}>Protected content</Heading>
                <Heading size={"xl"}>{message}</Heading>
            </Box>
        </Default>
    );
}

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


    return {
        props: {
            message:
                // if user has at least one NFT he will get congrats message
                nftList.raw.total > 0 ? 'Nice! You have the Access Pass! This is exclusive content!' : "Sorry, you don't have our NFT Access Pass therefore you cannot access this content. Go to the Home page to get the Access Pass.",
        },
    };
}

export default Protected;