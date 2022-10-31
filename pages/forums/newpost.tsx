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
import { CreateProposal } from 'components/templates/createproposal';

const Posts: NextPage<IForums> = (props) => {
    
  return (
    <Default pageName="NewPost">
      <Heading>Create a new post</Heading>
        <CreateProposal />

      <Heading>
        Previous proposals
      </Heading>

    </Default>
  );
};

export default Posts;