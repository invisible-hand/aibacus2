import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { ROUTE } from '../utils/constants/Route';

const Home = () => {
  return (
    <Container maxW={'7xl'} my={5}>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 8 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '5xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: `""`,
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.400',
                zIndex: -1,
              }}
            >
              Experience
            </Text>
            <br />
            <Text as={'span'} color={'green.400'}>
              the AI-powered education
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            We help K-12 students to maximize their learning experience.
            Instantly generate assignments and print them for self-study.
            Analyze and track student progress. Share your ideas with other
            parents.
          </Text>
          <Button
            as={Link}
            to={ROUTE.DEMO}
            px={6}
            fontWeight={'normal'}
            size={'lg'}
            rounded={'full'}
            colorScheme={'green'}
            bg={'green.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(72 187 120 / 48%), 0 10px 10px -5px rgb(72 187 120 / 43%)'
            }
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
          >
            Demo &rarr;
          </Button>
        </Stack>
        <Flex
          flex={1}
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Box
            position={'relative'}
            rounded={'2xl'}
            boxShadow={'2xl'}
            width={'full'}
            overflow={'hidden'}
          >
            <Image
              alt={'Hero Image'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={'main.png'}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
