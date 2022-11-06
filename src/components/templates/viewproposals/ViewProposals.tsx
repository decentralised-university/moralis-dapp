import { NextPage } from 'next';
import { IForums } from 'components/templates/forums/types';
import { Heading, Text, HStack, Flex, Badge, Box, Spacer, FormControl, FormLabel, Input, Button, FormHelperText} from '@chakra-ui/react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useContractRead } from 'wagmi'
import { SetStateAction, useState } from 'react';

const ViewProposals: NextPage<IForums> = (props) => {
    const [_id, setId] = useState('')
    const [description, setDescription] = useState('')
    // const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => setId(e.target.value)
    const handleClick = async (e: { target: { value: SetStateAction<string> } }) => {
      setId(e.target.value)
      const res = contractRead.refetch()
      console.log(`Greeting: ${res}`) 
    }

    const contractRead = useContractRead({
        addressOrName: '0x1eF8c1B2a1229131D5B377de50f29A0f1577E192',
        functionName: 'getProposal',
        chainId: 5,    
        contractInterface: [{
          name: "getProposal",
          type: "function",        
          stateMutability: "view",
          inputs: [{"internalType":"uint8", "name":"_id", "type":"uint8"}],
          outputs:[{"internalType":"string","name":"_description","type":"string"},
                   {"internalType":"uint256","name":"_deadline","type":"uint256"},
                   {"internalType":"uint256","name":"_votesUp","type":"uint256"},
                   {"internalType":"uint256","name":"_votesDown","type":"uint256"},
                   {"internalType":"bool","name":"_countConducted","type":"bool"},
                   {"internalType":"bool","name":"_passed","type":"bool"}],
        }],
        onSuccess(data) {
          console.log('Success', data)
            },
        onError(data) {
            console.log('An error occurred', data)
          },
            args: [setId],
      })

      contractRead.refetch 
      
        // Reading from the contract
    const readContract = async () => {
      const description = await contractRead.refetch()
      console.log(`Greeting: ${description}`)
    }

  return (
    <>
      <FormControl>
        <HStack my={4} mx={12}>
          <Input value={_id} onChange={event => setId(event.currentTarget.value)} placeholder="Proposal ID"></Input>
          <Button
            type='submit'
            onClick={ () => handleClick }
            disabled={contractRead.isLoading}
          >
            View proposal
          </Button>
        </HStack> 
      </FormControl>
    </>
  );
};

export default ViewProposals;