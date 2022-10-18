import { Default } from 'components/layouts/Default';
import Moralis from "moralis";
import EvmChain from "@moralisweb3/evm-utils";
import { Heading, Box, Button, Stack, Text,
        Popover,
        PopoverTrigger,
        PopoverContent,
        PopoverHeader,
        PopoverBody,
        PopoverFooter,
        PopoverArrow,
        PopoverCloseButton,
        PopoverAnchor,
 } from '@chakra-ui/react';
import { useWeb3Transfer } from "react-moralis";


// props are passed from getServerSideProps

function Native({ address, nativeBalance }) {

        const { fetch, error, isFetching } = useWeb3Transfer({
          amount: Moralis.Units.Token(1, 18),
          receiver: process.env.PRIVATE_ADDRESS,
          type: "erc20",
          contractAddress: "0x36cF6f47639aA8601C1aac635020d426AdAdBE9d",
        });



    return (
        <Default pageName="Native">
            <Heading>
                Native Balance
            </Heading>
            <Stack direction="column">
                <Box>
                    <Text fontSize="xl">
                        Wallet: {address} 
                    </Text>
                    <Text fontSize="xl">
                        Native Balance: { nativeBalance } ETH
                    </Text>
                </Box>
                <Box>
                    <Popover>
                        <PopoverTrigger>
                            <Button colorScheme="red" width="360px" size="lg">
                                Click for reward!
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
                <Box>
                    {error && <ErrorMessage error={error} />}
                    <Button onClick={() => fetch()} disabled={isFetching}>
                        Transfer
                    </Button>
                </Box>
                <Box>
                {error && <ErrorMessage error={error} />}
                <button onClick={() => fetch()} disabled={isFetching}>Transfer</button>
                </Box>
            </Stack>

        </Default>
    );
}

// This gets called on every page render
export async function getServerSideProps(context) {
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