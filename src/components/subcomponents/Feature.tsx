import { Stack, Flex, Text } from '@chakra-ui/react';
import { ReactNode, ReactElement } from 'react';

export interface FeatureProps {
  children: ReactNode;
  icon: ReactElement;
  iconBg: string;
}

const Feature = ({ children, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{children}</Text>
    </Stack>
  );
};

export default Feature;
