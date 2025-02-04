import {
  FormControl,
  FormLabel,
  Input,
  Icon,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react';
import React, { SetStateAction, useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';


function CreateProposal() {
  const daoAddress = '0x87BC353c81aC86C73E18D2698978537272AF195D';
  const [description, setDescription] = useState('');
  const handleInputChangeDescription = (e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value);

  const { config } = usePrepareContractWrite({
    addressOrName: daoAddress,
    functionName: 'createProposal',
    contractInterface: [
      {
        name: 'createProposal',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { "internalType": "string", "name": "_description", "type": "string" },
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
    args: [description],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

 
  return (

    <>
    <Heading>
      Submit a new proposal
    </Heading>
    <FormControl>
      <FormLabel mt={4}>Add the contents of the post below:</FormLabel>
      <Input value={description} onChange={handleInputChangeDescription} placeholder="This proposal is about..." />
      <Button mt={4} colorScheme="blue" _hover={{ bg: 'orange' }} size="lg" disabled={!write || isLoading} onClick={() => write?.()}>
        Post
      </Button>
    </FormControl>
    </>


  );
}

export default CreateProposal;
