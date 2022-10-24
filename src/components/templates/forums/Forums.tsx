import {
  Heading,
  Box,
  Button,
  Icon, Stack, Text, Flex, Image, Badge, Link,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from "next/link";
import { FC, useEffect, useState } from 'react';
import { IForums } from './types';
import { ForumPost } from 'components/modules/ForumPost';

  
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
        <Heading size="md"> 
          Example Forum
        </Heading>
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