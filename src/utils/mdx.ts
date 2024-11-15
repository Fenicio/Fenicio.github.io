export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  author: string;
  image: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

// Import all MDX files using Vite's import.meta.glob
const posts: Record<string, string> = import.meta.glob('../content/posts/*.mdx', {
  eager: true,
  as: 'raw',
});

export const getAllPosts = (): Post[] => {
  return Object.entries(posts).map(([filepath, content]) => {
    // Extract slug from filepath
    const slug = filepath.split('/').pop()?.replace('.mdx', '') || '';
    
    // Parse frontmatter
    const [, frontmatterStr = '', markdown = ''] = content.split('---');
    const frontmatter = parseFrontmatter(frontmatterStr);

    return {
      slug,
      frontmatter,
      content: markdown.trim(),
    };
  }).sort((a, b) => (new Date(b.frontmatter.date) as any) - (new Date(a.frontmatter.date) as any));
};

export const getPostBySlug = (slug: string): Post | null => {
  const post = getAllPosts().find(post => post.slug === slug);
  return post || null;
};

function parseFrontmatter(frontmatterStr: string): PostFrontmatter {
  const frontmatterLines = frontmatterStr.trim().split('\n');
  const frontmatter: Record<string, any> = {};

  frontmatterLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => 
          v.trim().replace(/['"]/g, '')
        );
      } else {
        // Remove quotes from string values
        value = value.replace(/['"]/g, '');
      }
      
      frontmatter[key.trim()] = value;
    }
  });

  return {
    title: frontmatter.title || '',
    date: frontmatter.date || '',
    tags: frontmatter.tags || [],
    excerpt: frontmatter.excerpt || '',
    author: frontmatter.author || '',
    image: frontmatter.image || '',
  };
}
