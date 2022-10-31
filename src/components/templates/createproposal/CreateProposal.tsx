import { Default } from 'components/layouts/Default';
import { Forums } from 'components/templates/forums';
import { NextPage } from 'next';
import { IForums } from 'components/templates/forums/types';
import { Heading, Text, HStack, Flex, Badge, Box, Spacer, FormControl, FormLabel, Input, Button, FormHelperText} from '@chakra-ui/react';
import { ForumPost } from 'components/modules/ForumPost';
import { RewardButton } from 'components/modules/RewardButton';
import { BiUpvote } from "react-icons/bi";
import { MdQuestionAnswer } from 'react-icons/md';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { SetStateAction, useState } from 'react';

const CreateProposal: NextPage<IForums> = (props) => {
    const [_description, setDescription] = useState('')
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)

    const { config,
            error: prepareError,
            isError: isPrepareError,
            } = usePrepareContractWrite({
        addressOrName: '0xF1B01483416f403a449cC01B72E9879194Ee0FF8',
        functionName: 'createProposal',
        chainId: 5,    
        contractInterface: [{
          name: "createProposal",
          type: "function",
          stateMutability: "nonpayable",
          inputs:[{
            internalType:"string",
            name:"_description",
            type:"string"
          }],
          outputs:[],
        }],
        onSuccess(data) {
          console.log('Success', data)
            },
          onError(data) {
              console.log('An error occurred', data)
            },
            args: [_description],
      })

      const { data, error, isError, write } = useContractWrite(config)
    
      const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })
      

  return (
    <>
      <FormControl>
        <FormLabel>
          Describe your proposal below:
        </FormLabel>
        <Input value={_description} onChange={handleInputChange}>
        
        </Input>
        <FormHelperText>
        Describe the new proposal.
      </FormHelperText>
      </FormControl>
      <Button 
        onClick={ () => write?.() } 
        disabled={ !write || isLoading }
        >
        Create
      </Button>
    </>
  );
};

export default CreateProposal;