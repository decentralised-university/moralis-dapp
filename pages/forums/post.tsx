import { Default } from 'components/layouts/Default';
import { NextPage } from 'next';
import { IForums } from 'components/templates/forums/types';
import { Heading, Text, HStack, Flex, Badge, Box, Spacer } from '@chakra-ui/react';
import { RewardButton } from 'components/modules/RewardButton';
import { BiUpvote } from "react-icons/bi";
import { MdQuestionAnswer } from 'react-icons/md';
import { ReactButton } from 'components/modules/ReactButton';


const ExamplePost: NextPage<IForums> = (props) => {
  return (
    <Default pageName="Post">
        <Heading>
            How do I participate in the governance of DU? I know it's possible to propose changes and vote on proposals but I can't work out how.
        </Heading>

        <HStack px={10}>
            <Flex  align="center">
                <Box as={BiUpvote} color="green.600" />
                <Text ml={1} fontSize="sm">
                    <b>16 Votes</b> 
                </Text>
            </Flex>
            <Flex align="center">
                <Box ml={6} as={MdQuestionAnswer} color="blue.300" />
                <Text ml={1} fontSize="sm">
                    <b>1 Answer</b> 
                </Text>
            </Flex>
            <Flex align="center">
                <Badge ml={6} colorScheme='blue'>
                    Top Question
                </Badge>
            </Flex>
            <Spacer/>
            <Flex>
                {/* <ReactButton _id={1} _vote={true}/> */}
                <ReactButton />
            </Flex>
        </HStack>

        <Heading my={8} ml={12} size={'lg'}>
                Top Answer:
        </Heading>
        <Box ml={12}>
            <Text my={5} fontSize=' xl'>
                First you will need to make sure you have the DU Access Pass in the your wallet. The Access Pass is an NFT which you can mint (get) on the Home page of this website. 
            </Text>
            <Text mb={5} fontSize=' xl'>
                Once you own an Access Pass, you will be able to participate in the governance of DU. Head over to the DAO page on this website using the navbar at the top. This is where you can create new proposals, vote on active proposals and view the results of completed voting processes.
            </Text>
            {/* <ReactButton _id={1} _vote={true}/> */}
            <ReactButton />
        </Box>
    </Default>
  );
};

export default ExamplePost;