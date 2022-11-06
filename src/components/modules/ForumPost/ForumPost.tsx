import { Box, Stack, Flex, Text, Badge, Spacer } from "@chakra-ui/react";
import { BiUpvote } from "react-icons/bi";
import { MdQuestionAnswer } from 'react-icons/md';
import { ReactButton } from "../ReactButton";

function ForumPost(props: { question: string; topAnswer: any; numVotes: string; numAnswers: string; badge: string; badgeColor: string; }) {
    const { question, topAnswer, numVotes, numAnswers, badge, badgeColor } = props;
 
    return (
    <Box>
        <Stack mt={10} p="3" borderWidth="5px" direction="row">
            <Box width={'130px'} padding={3}>
                <Flex mt={1} align="center">
                    <Box as={BiUpvote} color="green.600" />
                    <Text ml={1} fontSize="sm">
                        <b>{numVotes} Votes</b> 
                    </Text>
                </Flex>
                <Flex mt={1} align="center">
                    <Box as={MdQuestionAnswer} color="blue.300" />
                    <Text ml={1} fontSize="sm">
                        <b>{numAnswers} Answer</b> 
                    </Text>
                </Flex>
                <Flex mt={2}>
                    <Badge colorScheme={badgeColor}>
                        {badge}
                    </Badge>
                </Flex>
                <Flex mt={6}>
                    <ReactButton />
                </Flex>
            </Box>
            <Box w="900px" mx="20px" padding={3}>
                <Stack>
                    <Text fontSize="2xl" fontWeight="semibold" lineHeight="short">
                        {question}
                    </Text>
                    <Box pl={"100px"}>
                        <Text>
                            {topAnswer}
                        </Text>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    </Box>
    );
}

export default ForumPost;