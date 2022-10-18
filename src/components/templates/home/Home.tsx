import { CheckCircleIcon, SettingsIcon } from '@chakra-ui/icons';
import { Heading, Stack, Box, Text, Grid, GridItem, Button, useColorModeValue, Square } from '@chakra-ui/react';

const Home = () => {
  const bgGridItem = useColorModeValue('yellow.100', 'red.100')
  const color = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.100', 'gray.500')
  const shadowColor = useColorModeValue('grey.900','white')

  return (
      <>
      <Heading size="3xl" marginBottom={8}>Welcome To The Decentralised University</Heading>

      <Grid
        // h='800px'
        // w='max'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={10}
      >
        <GridItem colSpan={2} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color}>
          <Box p={5}>
            <Heading fontSize='2xl'>
              Get the DU Access Pass now!
            </Heading>
            <Text mt={4} fontSize='lg'>
              Get access to exclusive content by purchasing the Decentralised University Access Pass!
            </Text>
            <Square mt={4}>
              <Button size={'lg'}>
                Buy it here
              </Button>
            </Square>
          </Box>
        </GridItem>
        <GridItem colSpan={3} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color} />
        <GridItem colSpan={5} borderRadius='md' border="2px" borderColor={borderColor} shadow='dark-lg' color={color} />
      </Grid>
      </>
  );
};

export default Home;
