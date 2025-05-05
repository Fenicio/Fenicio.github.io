import { Stack, Box, Text, Link, Icon, useColorModeValue } from '@chakra-ui/react';
import { ElementType } from 'react';

export interface ProjectCardProps {
  title: string;
  text: string;
  icon: ElementType;
  link: string;
}

export function ProjectCard({ title, text, icon, link }: ProjectCardProps) {
  return (
    <Stack
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
      <Link href={link} isExternal _hover={{ textDecoration: 'none' }}>
        <Stack direction="row" align="center">
          <Box
            p={2}
            pos={'relative'}
            rounded={'xl'}
            bg={useColorModeValue('brand.100', 'brand.900')}
          >
            <Icon as={icon} w={8} h={8} color={'brand.400'} />
          </Box>
          <Text color={useColorModeValue('brand.600', 'brand.300')} fontWeight={500}>
            Visit
          </Text>
        </Stack>
      </Link>
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
