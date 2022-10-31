import React from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack
} from "@chakra-ui/react";
import NextLink from "next/link";

function Card(props: { title: string; summary: string; }) {
  const { title, summary } = props;

  return (
            <Box
            p={4}
            display={{ md: "flex" }}
            w="300px"
            h="190px"
            borderWidth={4}
            my={4}
            mx={8}
            shadow="xl"
            >
                <Stack
                    align={{ base: "center", md: "stretch" }}
                    textAlign={{ base: "center", md: "left" }}
                    m={{ md: 4 }}
                >
                  <NextLink href='/forums/forum' passHref>
                    <Link>
                      <Text
                          fontWeight="bold"
                          textTransform="uppercase"
                          fontSize="2xl"
                          letterSpacing="wide"
                      >
                      {title}
                      </Text>
                    </Link>
                  </NextLink>
                  <Text 
                  my={1} 
                  fontSize="md"
                  fontWeight="semibold"
                  >
                  {summary}
                  </Text>
                </Stack>
            </Box>

  );
}

export default Card;