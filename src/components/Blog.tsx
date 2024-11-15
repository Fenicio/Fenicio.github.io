import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  Container,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { getAllPosts } from '../utils/mdx';

interface BlogTags {
  tags: Array<string>;
  marginTop?: number;
}

export const BlogTags = (props: BlogTags) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="brand" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: string;
  name: string;
}

export const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{new Date(props.date).toLocaleDateString()}</Text>
    </HStack>
  );
};

export default function Blog() {
  const posts = useMemo(() => getAllPosts(), []);

  return (
    <Container maxW={'7xl'} p="12" id="blog">
      <Heading as="h1">Latest Blog Posts</Heading>
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
            width={{ base: '100%', sm: '85%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {posts.map((post) => (
                <VStack key={post.slug} align="stretch" mb={8}>
                  <Box borderRadius="lg" overflow="hidden">
                    <Link
                      as={RouterLink}
                      to={`/blog/${post.slug}`}
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Image
                        transform="scale(1.0)"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        objectFit="contain"
                        width="100%"
                        transition="0.3s ease-in-out"
                        _hover={{
                          transform: 'scale(1.05)',
                        }}
                      />
                    </Link>
                  </Box>
                  <BlogTags tags={post.frontmatter.tags} marginTop={3} />
                  <Heading fontSize="xl" marginTop="2">
                    <Link
                      as={RouterLink}
                      to={`/blog/${post.slug}`}
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      {post.frontmatter.title}
                    </Link>
                  </Heading>
                  <Text as="p" fontSize="md" marginTop="2">
                    {post.frontmatter.excerpt}
                  </Text>
                  <BlogAuthor
                    name={post.frontmatter.author}
                    date={post.frontmatter.date}
                  />
                </VStack>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
