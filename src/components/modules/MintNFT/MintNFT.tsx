import * as React from 'react';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { useDebounce } from 'usehooks-ts';
import { Button, FormControl, FormLabel, Input, Center, Box } from '@chakra-ui/react';
import { EvmChain } from '@moralisweb3/evm-utils';
import Moralis  from 'moralis';
import { ethers, utils } from 'ethers';


export function MintNFT() {
    const abi = [{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]; 
    const address = '0x4f2F874eb70E7B9406CCcDf1070eC7c757fe2381';
    const chain = EvmChain.GOERLI;
    const functionName = 'mintPrice';
    const apiKey = '1k4I5GjIg1O7yyncrXZ1amqNFSOT33gY7HnQBH2JHDuEWDPQUJRphRkVtGeYoRtY';
    // process.env.MORALIS_API_KEY;
    const serverUrl = process.env.MORALIS_SERVER_URL;
    const appId = process.env.MORALIS_APPLICATION_ID;

    async function getMintPrice() {
        await Moralis.start({
            apiKey: apiKey,
        });
        const response = await Moralis.EvmApi.utils.runContractFunction({
        abi,
        functionName,
        address,
        chain,
        })
        console.log(response.result)
    }

    const [tokenId, setTokenId] = React.useState('')
    const debouncedTokenId = useDebounce(tokenId)

    const { config,
            error: prepareError,
            isError: isPrepareError,
            } = usePrepareContractWrite({
                addressOrName: '0x4f2F874eb70E7B9406CCcDf1070eC7c757fe2381',
                functionName: 'mint',
                contractInterface: [
                    {
                        name: 'mint',
                        type: 'function',
                        stateMutability: 'payable',
                        inputs: [],
                        outputs: [],
                    },
                ],
                overrides: {
                    value: utils.parseEther('0.05'),
                    // maxFeePerGas: utils.parseEther('1.0'),
                  },
                onSuccess(data) {
                console.log('Success', data)
                  },
                onError(data) {
                    console.log('An error occurred', data)
                  },
                onSettled(data, error) {
                    console.log('Settled', { data, error })
                  },
                args: [],
                enabled: Boolean(debouncedTokenId),
                })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    return (
        <Box>
            <Button colorScheme="red" _hover={{ bg: 'orange'}} size="lg" m={8} disabled={ !write || isLoading} onClick={() => write?.() }>
              {isLoading ? 'Minting...' : 'Get Access Pass'}
            </Button>
            {isSuccess && (
                <Box>
                    Successfully minted your NFT!
                        <Box>
                            <a href={'https://etherscan.io/tx/${data?.hash}'}>Etherscan</a>
                        </Box>
                </Box>
            )}
            {isError && (
                <Box>
                    Error: {error?.message}
                </Box>
            )}
        </Box>

    )
  }

export default MintNFT;