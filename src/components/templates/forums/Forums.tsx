import {
  Heading,
  Box,
  Button,
  Icon, Stack, Text, Flex, Image, Badge, Link, FormControl, FormLabel,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FC, useEffect, useState } from 'react';
import { IForums } from './types';
import { ForumPost } from 'components/modules/ForumPost';


  
const Forums: FC<IForums> = ({  }) => {
    useEffect(() => console.log('forums: ', Forums), [Forums]);

    return (
      <>
        <Heading size="lg"> 
          Example Forum
        </Heading>

        <NextLink href='/forums/newpost' passHref>
          <Link>
          <Button>Create a new post</Button>
          </Link>
        </NextLink>

        <Heading>
          Top Questions
        </Heading>

        <NextLink href='/forums/post' passHref>
          <Link>
            <ForumPost 
              question="How do I participate in the governance of DU? I know it's possible to propose changes and vote on proposals but I can't work out how." 
              topAnswer={<><Text as='b'>Top Answer: </Text> 
              First you'll need to ensure that you hold the DU Access Pass NFT in your wallet. If you haven't bought this already, then you can easily do so on... 
              </>}
              numVotes="16" 
              numAnswers="1" 
              badge="Top Question" 
              badgeColor="blue" 
              />
          </Link>
        </NextLink>
        
        <ForumPost 
            question="How do you gain access to the exclusive content sections?" 
            topAnswer=""
            numVotes="3" 
            numAnswers="0" 
            badge="Bountied" 
            badgeColor="red" 
            />

        <ForumPost 
            question="How do I create my own NFT?" 
            topAnswer=""
            numVotes="2" 
            numAnswers="0" 
            badge="Bountied" 
            badgeColor="red" 
            />

      </>
    );
  };

export default Forums;