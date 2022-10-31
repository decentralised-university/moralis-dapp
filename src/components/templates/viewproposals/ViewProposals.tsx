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

const ViewProposals: NextPage<IForums> = (props) => {
    const [_id, setId] = useState('')
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setId(e.target.value)

    const { config,
            error: prepareError,
            isError: isPrepareError,
            } = usePrepareContractWrite({
        addressOrName: '0xF1B01483416f403a449cC01B72E9879194Ee0FF8',
        functionName: 'Proposals',
        chainId: 5,    
        contractInterface: [{
          name: "Proposals",
          type: "function",
          stateMutability: "view",
          inputs:[{
            "internalType":"uint256",
            "name":"_id",
            "type":"uint256"
          }],
          outputs:[{"internalType":"uint256","name":"id","type":"uint256"},
                   {"internalType":"bool","name":"exists","type":"bool"},
                   {"internalType":"string","name":"description","type":"string"},
                   {"internalType":"uint256","name":"deadline","type":"uint256"},
                   {"internalType":"uint256","name":"votesUp","type":"uint256"},
                   {"internalType":"uint256","name":"votesDown","type":"uint256"},
                   {"internalType":"bool","name":"countConducted","type":"bool"},
                   {"internalType":"bool","name":"passed","type":"bool"}],
        }],
        onSuccess(data) {
          console.log('Success', data)
            },
          onError(data) {
              console.log('An error occurred', data)
            },
            args: [_id],
      })

      const { data, error, isError, write } = useContractWrite(config)
    
      const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })
      

  return (
    <>
      <FormControl>
        <FormLabel>
          View a proposal
        </FormLabel>
        <Input value={_id} onChange={handleInputChange}>
        
        </Input>
        <FormHelperText>
        Input a proposal ID.
      </FormHelperText>
      </FormControl>
      <Button 
        onClick={ () => write?.() } 
        disabled={ !write || isLoading }
        >
        Create
      </Button>
      <Box>
        {/* { isSuccess ? description } */}
      </Box>
    </>
  );
};

export default ViewProposals;