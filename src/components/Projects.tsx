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

const activeProjects = [
  {
    id: 1,
    title: 'How To Vibe Dev community page',
    text: 'Building a community page for the Vibe Coding community.',
    icon: FaReact,
    link: 'https://www.howtovibe.dev',
  },
  {
    id: 2,
    title: 'n8n Automations',
    text: 'Creating automations using the n8n platform. Currently nothing in public.',
    icon: FaGamepad,
    link: 'https://n8n.io',
  },
];

const archivedProjects = [
  {
    id: 101,
    title: 'Boss Rush Star Otello',
    text: 'A Godot game developed for the Boss Rush Game Jam 2024. Play it on itch.io.',
    icon: FaGamepad,
    link: 'https://fornicio.itch.io/boss-rush-star-otello',
  },
  {
    id: 102,
    title: 'Incremental Decremental',
    text: 'A Godot game developed for the Incremental Game Jam Spring 2024. Play it on itch.io.',
    icon: FaGamepad,
    link: 'https://fornicio.itch.io/incremental-decremental',
  },
];

import { ProjectCard } from './subcomponents/ProjectCard';

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
        <Heading fontSize={'2xl'} mb={4} textAlign={'left'}>Active Projects</Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </SimpleGrid>

        <Heading fontSize={'2xl'} mb={4} textAlign={'left'}>Archived Projects</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {archivedProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
