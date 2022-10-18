import {
  Heading,
  Box,
  Button,
  Icon, Stack, Text, Flex, Image, Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { getSession, GetSessionParams } from 'next-auth/react';
import { getEllipsisTxt } from 'utils/format';
import { useWeb3Transfer } from 'react-moralis';
import { BiCoin } from 'react-icons/bi';
import Moralis from 'moralis';
import { userAgent } from 'next/server';
import { IForums } from './types';
import { RewardButton } from 'components/modules/RewardButton';
import { BiUpvote } from "react-icons/bi";
import { MdQuestionAnswer } from 'react-icons/md';

  
const Forums: FC<IForums> = ({  }) => {
    useEffect(() => console.log('forums: ', Forums), [Forums]);

    // const { fetch, error, isFetching } = useWeb3Transfer({
    //   // amount: Moralis.Units.Token(20, 18),
    //   receiver: "0x0000000000000000000000000000000000000000",
    //   type: "erc20",
    //   contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    // });
  
    return (
      <>
        <Heading> 
          Top Questions
        </Heading>

        <Stack mt={10} p="3" maxW="pw" borderWidth="5px" direction="row">
            <Box width={'200px'} padding={3}>
                <Flex mt={1} align="center">
                <Box as={BiUpvote} color="green.600" />
                <Text ml={1} fontSize="sm">
                    <b>8 Votes</b> 
                </Text>
                </Flex>
                <Flex mt={1} align="center">
                <Box as={MdQuestionAnswer} color="blue.300" />
                <Text ml={1} fontSize="sm">
                    <b>1 Answer</b> 
                </Text>
                </Flex>
                <Flex mt={3}>
                <Badge colorScheme="red">Bountied</Badge>
                </Flex>
            </Box>
            <Box padding={3}>
                <Text fontSize="3xl" fontWeight="semibold" lineHeight="short">
                [Example] A step-by-step how-to guide on creating NFTs.
                </Text>
                <Box>
                    <RewardButton />
                </Box>
            </Box>
        </Stack>

        <Stack mt={10} p="3" maxW="pw" borderWidth="5px" direction="row">
            <Box width={'200px'} padding={3}>
                <Flex mt={1} align="center">
                <Box as={BiUpvote} color="green.600" />
                <Text ml={1} fontSize="sm">
                    <b>5 Votes</b> 
                </Text>
                </Flex>
                <Flex mt={1} align="center">
                <Box as={MdQuestionAnswer} color="blue.300" />
                <Text ml={1} fontSize="sm">
                    <b>1 Answer</b> 
                </Text>
                </Flex>
                <Flex mt={3}>
                <Badge colorScheme="red">Bountied</Badge>
                </Flex>
            </Box>
            <Box padding={3}>
                <Text fontSize="3xl" fontWeight="semibold" lineHeight="short">
                [Example] A step-by-step how-to guide on accessing learning content.
                </Text>
                <Box>
                    <RewardButton />
                </Box>
            </Box>
        </Stack>

      </>
    );
  };

export default Forums;