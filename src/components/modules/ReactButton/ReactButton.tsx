import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Icon,
  Button,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  CircularProgress,
} from '@chakra-ui/react';
import React from 'react';
import { useDebounce } from 'use-debounce';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import { BiCoin } from 'react-icons/bi';


// _id: any, _vote: boolean
function ReactButton( ) {
  const pointsAddress = '0x41f41C3BCBfB2b5AE57c39BD654109c8eD98872f';

  const { config, error: prepareError, isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: pointsAddress,
    functionName: 'voteOnPost',
    contractInterface: [
      {
        name: 'voteOnPost',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { "internalType": "uint256", "name": "_id", "type": "uint256" },
          { "internalType": "bool", "name": "_vote", "type": "bool" }
        ],
        outputs: [],
      },
    ],
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(data) {
      console.log('An error occurred', data);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
    args: [1, true],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    timeout: 3000,
    wait: data?.wait,
  });


  return (

    <Popover>
      <PopoverTrigger>
        <Button colorScheme="red" _hover={{ bg: 'orange' }} size="sm" disabled={!write || isLoading} onClick={() => write?.()}>
          Upvote
        </Button>
      </PopoverTrigger>
      <PopoverContent
        color='white' bg='blue.800'
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          {!isLoading && !isSuccess && <Box>Go to your wallet and sign the transaction. This will cost a small gas fee.</Box>}
          {isLoading && !isSuccess && <Box><CircularProgress isIndeterminate /> Processing reward... </Box>}
          {isSuccess && <Box>Confirmation!</Box>}
        </PopoverHeader>
        {isLoading && <PopoverBody>
          <Box>Wait a few seconds before seeing the transaction on <a color='blue' href={'https://goerli.etherscan.io/token/0x41f41C3BCBfB2b5AE57c39BD654109c8eD98872f'} target="_blank"> Etherscan.</a></Box>

        </PopoverBody>}
      </PopoverContent>
    </Popover>



  );
}

export default ReactButton;
