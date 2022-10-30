import * as React from 'react';
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { Button, FormControl, FormLabel, Input, Center, Box, AlertIcon, Alert, AlertDescription, Heading, Square } from '@chakra-ui/react';


function CreateProposal() {
    const address = '0xF1B01483416f403a449cC01B72E9879194Ee0FF8';
    const [description, setDescription] = React.useState('')

    const { config,
            // error: prepareError,
            // isError: isPrepareError,
            } = usePrepareContractWrite({
                addressOrName: address,
                functionName: 'createProposal',
                contractInterface: [
                  {
                    "inputs": [{
                      "internalType":"string",
                      "name":"_description",
                      "type":"string"
                    }],
                    "name":"createProposal",
                    "outputs":[],
                    "stateMutability":"nonpayable",
                    "type":"function"}
                ],
                args: description,
                onSuccess(data) {
                  console.log('Success', data)
                  },
                onError(data) {
                  console.log('An error occurred', data)
                  },
                onSettled(data, error) {
                  console.log('Settled', { data, error })
                  },
                })

    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
  
    return (
        <Box>
          <FormControl       
          onSubmit={(e) => {
            e.preventDefault()
            write?.()
            }}
          >
          <Heading fontSize='2xl' mb={4}>Create a new proposal</Heading>
          <FormLabel>Description:</FormLabel>
          <Input
            id="_description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you wish to include in the proposal?"
            value={description} 
            fontSize='lg'
            >
          </Input>
          <Square>
            <Button 
              disabled={!write || isLoading} 
              onClick={() => write?.() }
              my={4}
              colorScheme={'orange'} size={'lg'}
            >
              {isLoading ? 'Submitting proposal...' : 'Submit Proposal'}
            </Button>
          </Square>

          {isSuccess ? (
            <Alert status='success'>
              <AlertIcon />
              <AlertDescription>
                Successfully created proposal!
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </AlertDescription>
            </Alert>
          ) : (            
            <Alert status='info'>
              <AlertIcon /> 
              <AlertDescription>
                Create a proposal by filling in the description and submitting it above.
              </AlertDescription>
            </Alert>
            )
        }
          {(isError) && (
            <Box>Error: {(error)?.message}</Box>
          )}

          </FormControl>
      </Box>

    )
  }

export default CreateProposal;