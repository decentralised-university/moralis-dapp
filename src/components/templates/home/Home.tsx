import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, Stack, Box, Text, Grid, GridItem, Button, useColorModeValue, Square } from '@chakra-ui/react';
import { MintNFT } from 'components/modules/MintNFT';

const Home = () => {
  const bgGridItem = useColorModeValue('yellow.100', 'red.100')
  const color = useColorModeValue('gray', 'gray')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const boxGradient = useColorModeValue('linear(to-br, gray.200, white)','linear(to-br, gray.900, gray.600)')
  const boxColor = useColorModeValue('red.100','red.900')
  const textGradient = useColorModeValue('linear(to-br, gray.600, gray.900)','linear(to-br, gray.100, gray.300)')

  return (
      <>
      <Heading 
        size="xl"
        bgColor={color}
        bgClip='text'
        fontWeight='extrabold'
        >
          Welcome To
      </Heading>
      <Heading 
        size="4xl"
        p={1}
        marginBottom={16}
        bgGradient= {textGradient}
        bgClip='text'
        fontWeight='extrabold'
        >
        The Decentralised University
      </Heading>

      <Grid
        // h='800px'
        // w='max'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(2, 1fr)'
        gap={10}
      >
        <GridItem colSpan={1} bgGradient={boxGradient} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg'>
          <Box p={5}>
            <Heading size="lg">
              Get the DU Access Pass!
            </Heading>
            <Text mt={4} mb={12} fontSize='lg'>
              Get access to exclusive content by purchasing the Decentralised University Access Pass!
            </Text>
            <Square >
              <MintNFT/>
            </Square>
          </Box>
        </GridItem>
        <GridItem colSpan={1} bgGradient={boxGradient} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg'>
          <Box p={5}>
            <Heading size="lg">
              Claim your first DU Points!
            </Heading>
            <Text mt={4} mb={8} fontSize='lg'>
              You can earn more points by contributing to the University community, by supporting others with helpful posts and comments in forums, creating learning guides, and much more to come.
            </Text>
            <Square mt={4}>
              <Button colorScheme="purple" _hover={{ bg: 'orange'}} size="lg">Claim Points</Button>
            </Square>
          </Box>
        </GridItem>
      </Grid>
      </>
  );
};

export default Home;
