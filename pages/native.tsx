import { Default } from 'components/layouts/Default';
import Moralis from "moralis";
import EvmChain from "@moralisweb3/evm-utils";
import { Heading, Box, Button, Stack, Text, Flex, Image, Badge,
 } from '@chakra-ui/react';
import { useWeb3Transfer } from "react-moralis";
import { BiUpvote } from "react-icons/bi";
import { MdQuestionAnswer } from 'react-icons/md';
import { RewardButton } from "../src/components/modules/RewardButton";


// props are passed from getServerSideProps

function Native({ }) {

    return (
        <Default pageName="Native">
            <Heading marginBottom='20'>
                Top Questions
            </Heading>

            <Stack mt={10} p="3" maxW="pw" borderWidth="5px" direction="row">
                <Box width={'200px'} padding={3}>
                    <Flex mt={1} align="center">
                    <Box as={BiUpvote} color="green.600" />
                    <Text ml={1} fontSize="sm">
                        <b>8 Votes</b> 
                    </Text>
                    </Flex>
                    <Flex mt={1} align="center">
                    <Box as={MdQuestionAnswer} color="blue.300" />
                    <Text ml={1} fontSize="sm">
                        <b>1 Answer</b> 
                    </Text>
                    </Flex>
                    <Flex mt={3}>
                    <Badge colorScheme="red">Bountied</Badge>
                    </Flex>
                </Box>
                <Box padding={3}>
                    <Text fontSize="3xl" fontWeight="semibold" lineHeight="short">
                    [Example] A step-by-step how-to guide on creating NFTs.
                    </Text>
                    <Box>
                        <RewardButton />
                    </Box>
                </Box>
            </Stack>

            <Stack mt={10} p="3" maxW="pw" borderWidth="5px" direction="row">
                <Box width={'200px'} padding={3}>
                    <Flex mt={1} align="center">
                    <Box as={BiUpvote} color="green.600" />
                    <Text ml={1} fontSize="sm">
                        <b>5 Votes</b> 
                    </Text>
                    </Flex>
                    <Flex mt={1} align="center">
                    <Box as={MdQuestionAnswer} color="blue.300" />
                    <Text ml={1} fontSize="sm">
                        <b>1 Answer</b> 
                    </Text>
                    </Flex>
                    <Flex mt={3}>
                    <Badge colorScheme="red">Bountied</Badge>
                    </Flex>
                </Box>
                <Box padding={3}>
                    <Text fontSize="3xl" fontWeight="semibold" lineHeight="short">
                    [Example] A step-by-step how-to guide on accessing learning content.
                    </Text>
                    <Box>
                        <RewardButton />
                    </Box>
                </Box>
            </Stack>
        </Default>
    );
}

// This gets called on every page render
export async function getServerSideProps() {
    // reads the api key from .env.local and starts Moralis SDK
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

    const address = process.env.PRIVATE_ADDRESS;

    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
        chain: process.env.APP_CHAIN_ID,
        address,
    });
    
    return {
        props: {
            address, nativeBalance: nativeBalance.result.balance.ether }, // will be passed to the page component as props
    };
}

export default Native;