import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaReact, FaGamepad, FaRobot } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: 'React Web Applications',
    text: 'Building modern, responsive web applications using React and related technologies.',
    icon: FaReact,
    link: '#',
  },
  {
    id: 2,
    title: 'Godot Game Development',
    text: 'Creating engaging game experiences using the Godot game engine.',
    icon: FaGamepad,
    link: '#',
  },
  {
    id: 3,
    title: 'LLM-Powered Tools',
    text: 'Developing productivity tools and applications leveraging Large Language Models.',
    icon: FaRobot,
    link: '#',
  },
];

function ProjectCard({ title, text, icon, link }) {
  return (
    <Stack
      as={Link}
      href={link}
      p={5}
      alignItems={'start'}
      justifyContent={'start'}
      rounded={'xl'}
      pos={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Box
        p={2}
        pos={'relative'}
        rounded={'xl'}
        bg={useColorModeValue('brand.100', 'brand.900')}
      >
        <Icon as={icon} w={8} h={8} color={'brand.400'} />
      </Box>
      <Stack pt={4} align={'start'}>
        <Text
          fontWeight={600}
          fontSize={'xl'}
          lineHeight={1.1}
          color={useColorModeValue('gray.900', 'white')}
        >
          {title}
        </Text>
        <Text
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          {text}
        </Text>
      </Stack>
    </Stack>
  );
}

export default function Projects() {
  return (
    <Box p={4} id="projects">
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={'3xl'}>Featured Projects</Heading>
        <Text color={'gray.600'} fontSize={'xl'}>
          Here are some of my notable projects across different domains.
        </Text>
      </Stack>

      <Container maxW={'6xl'} mt={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
