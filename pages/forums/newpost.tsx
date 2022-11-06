import { Default } from 'components/layouts/Default';
import { NextPage } from 'next';
import { IForums } from 'components/templates/forums/types';
import { Heading, Text, HStack, Flex, Badge, Box, Spacer, FormControl, FormLabel, Input, Button, FormHelperText} from '@chakra-ui/react';
import { CreatePost } from 'components/modules/CreatePost';

const Posts: NextPage<IForums> = (props) => {
    
  return (
    <Default pageName="NewPost">
      <Box px={24}>
        <Heading>Create a new post</Heading>
        <CreatePost />
      </Box>
  
    </Default>
  );
};

export default Posts;