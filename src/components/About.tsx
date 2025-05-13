import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  Button,
  Link,
} from '@chakra-ui/react';
import { IoLogoBitbucket, IoGameController, IoSparkles, IoLeaf } from 'react-icons/io5';

import Feature from './subcomponents/Feature';
import DistractoMatic from './subcomponents/DistractoMatic';

export default function About() {
  return (
    <Container maxW={'5xl'} py={12} id="about">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4} alignItems="center">
          <Box alignSelf="flex-start">
            <Text
              textTransform={'uppercase'}
              color={'brand.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('brand.50', 'brand.900')}
              p={2}
              rounded={'md'}
            >
              About Me
            </Text>
          </Box>
          <Heading textAlign="center">Fullstack Developer</Heading>
          <Text color={useColorModeValue('gray.700', 'gray.300')} fontSize={'lg'} textAlign="center">
            Currently employed at <Link href="https://www.version1.com" isExternal>Version1</Link> as a Fullstack Developer.
          </Text>
          <Image
            src="https://avatars.githubusercontent.com/u/3343187?v=4"
            alt="Guiom's Profile"
            width="300px"
            height="300px"
            borderRadius="full"
            objectFit="cover"
          />
          <Box
            p={5}
            shadow={'md'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            bg={useColorModeValue('white', 'gray.800')}
            w="full"
            maxW="md"
          >
            <Stack spacing={4} alignItems="center">
            <Link href="https://garden.guiom.dev" isExternal>
            <Button colorScheme="brand" size="md" variant="outline">
              <Stack direction={'row'} align={'center'}>
                <Icon as={IoLeaf} color={'green.500'} w={6} h={6} />
                <Text fontWeight={600}>My Digital Garden</Text>
              </Stack>
              </Button>
              </Link>
            </Stack>
          </Box>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }
          >
            <Feature
              icon={<Icon as={IoLogoBitbucket} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
            >
              Fullstack Development with React
            </Feature>
            <Feature
              icon={<Icon as={IoGameController} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
            >
              Game Development with Godot
            </Feature>
            <Feature
              icon={<Icon as={IoSparkles} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
            >
              LLMs and Productivity Tools
            </Feature>
          </Stack>
        </Stack>
        <Flex>
          <DistractoMatic />
          
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
