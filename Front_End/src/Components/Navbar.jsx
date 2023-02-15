import React from 'react'
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

const Navbar = () => {
 const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue('teal.100', 'teal.900')} px={4}>
        <Flex h={16} alignItems={'center'} fontSize={"20px"} justifyContent={'space-around'}>
          <Link to="/">Landing Page</Link>
          <Link to="/login">Login</Link>
          
          <Link to="/cartpage">My Cart</Link>

          {/* <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex> */}
        </Flex>
      </Box>
    </>
  );
}

export default Navbar