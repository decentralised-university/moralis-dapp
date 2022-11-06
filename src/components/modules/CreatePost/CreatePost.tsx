import {
  FormControl,
  FormLabel,
  Input,
  Icon,
  Button,
  Box,
} from '@chakra-ui/react';
import React, { SetStateAction, useState } from 'react';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';


function CreatePost() {
  const pointsAddress = '0x41f41C3BCBfB2b5AE57c39BD654109c8eD98872f';
  const [description, setDescription] = useState('');
  const handleInputChangeTitle = (e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)


  const [title, setTitle] = useState('');
  const handleInputChangeDescription = (e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)


  const { config, 
          error: prepareError, 
          isError: isPrepareError,
        } = usePrepareContractWrite({
    addressOrName: pointsAddress,
    functionName: 'createPost',
    contractInterface: [
      {
        name: 'createPost',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { "internalType": "string", "name": "_title", "type": "string" },
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
    args: [title, description],
  });

  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });


  return (

    <FormControl>
      <FormLabel mt={4}>Add a title to your post below:</FormLabel>
      <Input value={title} onChange={handleInputChangeTitle} placeholder="Title"/>
      <FormLabel mt={4}>Add the contents of the post below:</FormLabel>
      <Input value={description} onChange={handleInputChangeDescription} placeholder="The main part of your post goes here..."/>
      <Button mt={4} colorScheme="blue" _hover={{ bg: 'orange' }} size="lg" disabled={!write || isLoading} onClick={() => write?.()}>
        Post
      </Button>
    </FormControl>


  );
}

export default CreatePost;
