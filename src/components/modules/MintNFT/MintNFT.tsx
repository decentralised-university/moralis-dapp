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
    const address = '0x6d818827046A47db24E08d0E7799E21E384901c4';


    const { config,
            error: prepareError,
            isError: isPrepareError,
            } = usePrepareContractWrite({
                addressOrName: address,
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
                    value: utils.parseEther('0.01'),
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
                })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    return (
        <Box>
            <Button colorScheme="red" _hover={{ bg: 'orange'}} size="lg" disabled={ !write || isLoading} onClick={() => write?.() }>
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