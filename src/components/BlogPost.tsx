import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Heading, Image, Text, VStack, Button } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { getPostBySlug } from '../utils/mdx';
import { BlogTags, BlogAuthor } from './Blog';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

// Custom components for markdown rendering
const components = {
  h1: (props: any) => <Heading as="h1" size="2xl" my={4} {...props.children} />,
  h2: (props: any) => <Heading as="h2" size="xl" my={4} {...props.children} />,
  h3: (props: any) => <Heading as="h3" size="lg" my={3} {...props.children} />,
  p: (props: any) => <Text fontSize="lg" my={2} {...props.children} />,
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <Box
        as="code"
        fontFamily="mono"
        px={2}
        py={1}
        borderRadius="sm"
        bg="gray.100"
        {...props}
      >
        {children}
      </Box>
    );
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = useMemo(() => (slug ? getPostBySlug(slug) : null), [slug]);

  const handleBackClick = () => {
    navigate('/#blog');
    // Add a small delay to allow for navigation before scrolling
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!post) {
    return <Container>Post not found</Container>;
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Button
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          alignSelf="flex-start"
          onClick={handleBackClick}
        >
          Back to Blog
        </Button>
        <Image
          src={post.frontmatter.image}
          alt={post.frontmatter.title}
          borderRadius="lg"
          objectFit="cover"
          width="100%"
          height="400px"
        />
        <BlogTags tags={post.frontmatter.tags} />
        <Heading as="h1" size="2xl">
          {post.frontmatter.title}
        </Heading>
        <BlogAuthor
          name={post.frontmatter.author}
          date={post.frontmatter.date}
        />
        <Box className="markdown-content">
          <ReactMarkdown 
            components={components}
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </Box>
      </VStack>
    </Container>
  );
}
