import * as React from 'react';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { Button, FormControl, FormLabel, Input, Center, Box } from '@chakra-ui/react';


export function ClaimPoints() {
    const address = '0x41f41C3BCBfB2b5AE57c39BD654109c8eD98872f';
    // const abi = [{"inputs":[],"name":"mintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]; 
    // const chain = EvmChain.GOERLI;
    // const functionName = 'mintPrice';
    // const apiKey = process.env.MORALIS_API_KEY;
    // process.env.MORALIS_API_KEY;


    const { config,
            // error: prepareError,
            // isError: isPrepareError,
            } = usePrepareContractWrite({
                addressOrName: address,
                functionName: 'claimPoints',
                contractInterface: [
                    {
                        name: 'claimPoints',
                        type: 'function',
                        stateMutability: 'payable',
                        inputs: [],
                        outputs: [],
                    },
                ],
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
                })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    return (
        <Box>
            <Button colorScheme="purple" _hover={{ bg: 'orange'}} size="lg" disabled={ !write || isLoading} onClick={() => write?.() }>
              {isLoading ? 'Processing...' : 'Claim your first DU Points'} 
            </Button>
            {isSuccess && (
                <Box>
                    You received 100 free Points!
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

export default ClaimPoints;