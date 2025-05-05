import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
];

import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (href: string) => {
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    const isOnBlogPost = location.pathname.startsWith('/blog/');
    if (isOnBlogPost) {
      navigate('/');
      // Scroll to top after a small delay
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState({}, '', '/');
    }
  };

  const { colorMode, setColorMode } = useColorMode();

  return (
    <Box width="100%">
      {/* Theme Mode Buttons */}
      <div style={{ height: '13px' }} />
      <Flex position="fixed" top="12px" right="24px" zIndex={1100} gap={2}>
        <IconButton
          aria-label="Light mode"
          icon={<SunIcon />}
          isActive={colorMode === 'light'}
          onClick={() => {
            setColorMode('light');
          }}
          size="sm"
          variant={colorMode === 'light' ? 'solid' : 'outline'}
        />
        <IconButton
          aria-label="Dark mode"
          icon={<MoonIcon />}
          isActive={colorMode === 'dark'}
          onClick={() => {
            setColorMode('dark');
          }}
          size="sm"
          variant={colorMode === 'dark' ? 'solid' : 'outline'}
        />
      </Flex>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'center'}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex 
          justify={'center'} 
          maxW="6xl" 
          width="100%"
        >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
            cursor="pointer"
            onClick={handleHomeClick}
          >
            Guillermo G C
          </Text>
          <DesktopNav handleClick={handleClick} />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav handleClick={handleClick} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ handleClick }: { handleClick: (href: string) => void }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            onClick={() => handleClick(navItem.href)}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}>
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ handleClick }: { handleClick: (href: string) => void }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} onClick={handleClick} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, onClick }: NavItem & { onClick: (href: string) => void }) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          onClick={() => onClick(href)}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};
