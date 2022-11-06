import {
    Heading, Box, Button, Grid, GridItem,
    Square, Text, useColorModeValue, HStack,
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
import { CreateProposal } from 'components/modules/CreateProposal';
import React from 'react';
import NextLink from "next/link";
import { ViewProposals } from '../viewproposals';
import { VoteOnProposal } from 'components/modules/VoteOnProposal';


const Dao: FC<IDao> = () => {
    useEffect(() => console.log('dao: ', Dao), [Dao]);
    const bgGridItem = useColorModeValue('yellow.100', 'red.100')
    const color = useColorModeValue('gray.800', 'white')
    const borderColor = useColorModeValue('gray.100', 'gray.500')
    const shadowColor = useColorModeValue('grey.900','white')

    return (
        <>
        <Heading size="2xl" marginBottom={8}> 
          DAO Homepage
        </Heading>
        {/* <DaoHome /> */}
        <Grid
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(2, 1fr)'
            gap={10}
        >
            <GridItem colSpan={2} p={6} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
                <CreateProposal />
            </GridItem>

            <GridItem colSpan={2} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
                <Box p={5}>
                    <Heading fontSize='2xl'>
                    Vote on active proposals
                    </Heading>
                    <HStack></HStack>
                    <Text mt={4} fontSize='lg'>
                    Cast your vote on active proposals from the DU Community.
                    </Text>
                    <VoteOnProposal />
                </Box>
            </GridItem>
        </Grid>
        </>
    );
};
        
export default Dao;