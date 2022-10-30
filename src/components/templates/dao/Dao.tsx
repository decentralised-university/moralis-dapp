import {
    Heading, Box, Button, Grid, GridItem, color,
    Square, Text, useColorModeValue,
    FormControl, FormLabel, Input, Center, AlertIcon, Alert, AlertDescription, Link
  } from '@chakra-ui/react';
  import { FC, useEffect, useState } from 'react';
  import { getSession, GetSessionParams } from 'next-auth/react';
  import { useWeb3Transfer } from 'react-moralis';
  import Moralis from 'moralis';
  import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
  } from 'wagmi';
import { IDao } from './types';
import DaoHome from './DaoHome';
import { CreateProposal } from 'components/modules/CreateProposal';
import React from 'react';
import NextLink from "next/link";


const Dao: FC<IDao> = ({  }) => {
    useEffect(() => console.log('dao: ', Dao), [Dao]);
    const bgGridItem = useColorModeValue('yellow.100', 'red.100')
    const color = useColorModeValue('gray.800', 'white')
    const borderColor = useColorModeValue('gray.100', 'gray.500')
    const shadowColor = useColorModeValue('grey.900','white')

    return (
        <>
        <Heading size="3xl" marginBottom={8}> 
          DAO Homepage
        </Heading>
        {/* <DaoHome /> */}
        <Grid
            // h='800px'
            // w='max'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(3, 1fr)'
            gap={10}
        >
            <GridItem colSpan={2} p={6} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
                <CreateProposal />
            </GridItem>
            <GridItem colSpan={1} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
            <Box p={5}>
                <Heading fontSize='2xl'>
                Create a new proposal
                </Heading>
                <Text mt={4} fontSize='lg'>
                Create a new proposal to be voted on by the DU Community.
                </Text>
                <Square mt={20}>
                    <Button colorScheme={'orange'} size={'lg'}>
                        Get started here
                    </Button>
                </Square>
            </Box>
            </GridItem>
            <GridItem colSpan={1} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
                <Box p={5}>
                    <Heading fontSize='2xl'>
                    Vote on active proposals
                    </Heading>
                    <Text mt={4} fontSize='lg'>
                    Cast your vote on active proposals from the DU Community.
                    </Text>
                    <Square mt={6}>
                        <Button colorScheme={'green'} size={'lg'}>
                            Cast your vote
                        </Button>
                    </Square>
                </Box>
            </GridItem>
            <GridItem colSpan={1} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
                <Box p={5}>
                    <Heading fontSize='2xl'>
                    View DAO events history
                    </Heading>
                    <Text mt={4} fontSize='lg'>
                    View past proposals and voting results from the DU Community.
                    </Text>
                    <Square mt={12}>
                        <NextLink href='/dao/proposals' passHref>
                            <Link>
                            <Button colorScheme={'blue'} size={'lg'}>
                                Click to view
                            </Button>
                            </Link>
                        </NextLink>
                    </Square>
                </Box>
            </GridItem>
        </Grid>
        </>
    );
};
        
export default Dao;