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


const VoteOnProposal = ({ id }) => {
  const daoAddress = '0x87BC353c81aC86C73E18D2698978537272AF195D';

  // const [id, setId] = useState('');
  // const handleInputChangeId = (e: { target: { value: SetStateAction<string>; }; }) => setId(e.target.value)
  
  const _voteYes: boolean = true;
  const _voteNo: boolean = false;

  const voteYes = usePrepareContractWrite({
    addressOrName: daoAddress,
    functionName: 'voteOnProposal',
    contractInterface: [
      {
        name: 'voteOnProposal',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { "internalType": "uint256", "name": "_id", "type": "uint256" },
          { "internalType": "bool", "name": "_vote", "type": "bool" },
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
    args: [id, _voteYes],
  });

  const voteNo = usePrepareContractWrite({
    addressOrName: daoAddress,
    functionName: 'voteOnProposal',
    contractInterface: [
      {
        name: 'voteOnProposal',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { "internalType": "uint256", "name": "_id", "type": "uint256" },
          { "internalType": "bool", "name": "_vote", "type": "bool" },
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
    args: [id, _voteNo],
  });

  const _yes = useContractWrite(voteYes.config);
  const _yesWait = useWaitForTransaction({ hash: _yes.data?.hash });
  
  const _no = useContractWrite(voteNo.config);
  const _noWait = useWaitForTransaction({ hash: _no.data?.hash });


  return (

    <>
    <FormControl>
      {/* <FormLabel mt={4}>Input the ID of the proposal you wish to vote on:</FormLabel>
      <Input value={id} onChange={handleInputChangeId} placeholder="Proposal ID" /> */}
    
      <Button m={4} colorScheme="green" _hover={{ bg: 'green' }} size="lg" disabled={!_yes.write || _yesWait.isLoading} onClick={() => _yes.write?.()}>
        Vote For
      </Button>
      <Button m={4} colorScheme="red" _hover={{ bg: 'red' }} size="lg" disabled={!_no.write || _noWait.isLoading} onClick={() => _no.write?.()}>
        Vote Against
      </Button>
    </FormControl>


    </>
  );
}

export default VoteOnProposal;
