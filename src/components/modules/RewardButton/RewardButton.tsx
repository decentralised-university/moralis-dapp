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
  usePrepareSendTransaction, 
  useSendTransaction, 
  useWaitForTransaction 
} from 'wagmi';
import { parseEther } from 'ethers/lib/utils';
import { BigNumber } from 'ethers';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Moralis from 'moralis';
import { BiCoin } from 'react-icons/bi';



const RewardButton = ({ }) => {  

  const { config } = usePrepareSendTransaction({
    request: {
      to: '0xf5B1e993Faf3A9188E751693fce6D154A8Ef21a1',
      value: parseEther('0.01'),
    },
  })

  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  
  return (
<Popover>
  <PopoverTrigger>
      <Button 
      leftIcon={ <Icon as={BiCoin}/> } 
      rightIcon={ <Icon as={BiCoin}/> }
      mt={4}
      colorScheme='red'
      size='sm'
      disabled={!sendTransaction}
      onClick={() => sendTransaction?.()}
      >
        {isLoading ? 'Sending Reward...' : 'Reward!'}
      </Button>
  </PopoverTrigger>
  <PopoverContent
    color='white' bg='blue.800'
    >
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>
        {!isLoading && !isSuccess && <Box>Go to your wallet and sign the transaction</Box>}
        {isLoading && <Box><CircularProgress isIndeterminate/> Pending... </Box>}
        {isSuccess && <Box>Confirmation!</Box>}
      </PopoverHeader>
        {isSuccess && <PopoverBody>
                        <Box>Successfully sent 0.01 ether.</Box>
                        <Box>Tx Hash: {JSON.stringify(data)}</Box>
                      </PopoverBody>}
  </PopoverContent>
</Popover>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

//   if (!session?.user.address) {
//     return { props: { error: 'Connect your wallet first' } };
//   }

//   return {
//       address: session?.user.address,
//   };
// };

export default RewardButton;
