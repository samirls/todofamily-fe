import {
  Avatar,
  Box,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { FaClipboardCheck } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import React, { ReactNode } from "react";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { useMe } from "../../hooks/useMe";

export default function SidebarWithHeader({children, containerSize = "7xl"}: { children?: ReactNode; containerSize?: string }) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sidebar = useDisclosure();
  const {data: me} = useMe()

  return (
    <Box as="section" bg="gray.50" _dark={{bg: "gray.700",}} minH="100vh">
      <SidebarContent display={{base: "none", md: "unset",}} />
      <Drawer isOpen={sidebar.isOpen} onClose={sidebar.onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{base: 0, md: 60,}} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="flex-end"
          w="full"
          px="4"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          borderBottomWidth="1px"
          color="inherit"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{
              base: "inline-flex",
              md: "none",
            }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{boxShadow: 'none'}}>
              <HStack>
                <Avatar
                  size={{ base: 'sm', md: 'sm', lg: 'sm' }}
                  borderColor={"gray.400"}
                  showBorder={true}
                />
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{me?.user?.name}</Text>
                </VStack>
                <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <NextLink href={"/logout"}>
                <MenuItem>
                  Desconectar
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Flex>
          <Container p={isMobile ? '5px' : '15px'} maxW={containerSize}>
            {children}
          </Container>
      </Box>
    </Box>
  )
};

type NavItemProps = {
  icon?: IconType;
  children: ReactNode;
  href?: string;
  onClick?: () => void;

  //todo: remover depois!
  pl?: string | number;
  py?: string | number;
}

const NavItem = ({icon, children, href, ...rest}: NavItemProps) => {
  const color = useColorModeValue("gray.600", "gray.300");
  return (
    <NextLink href={href} passHref>
      <Flex
        borderRadius={"md"}
        as="a"
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{
          color: "gray.400",
        }}
        _hover={{
          bg: "gray.100",
          _dark: {
            bg: "gray.900",
          },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </NextLink>
  );
};

const SidebarContent = (props) => {
  const integrations = useDisclosure();
  const products = useDisclosure();
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      border
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex justify={"center"} py="5" >
        {/*<Logo />*/}
        <NextLink href="/" passHref>
          <Link sx={{'&:hover': {textDecoration: 'none'}}}>
            <Text
              textAlign={useBreakpointValue({base: 'left', md: 'left'})}
              fontSize={"25px"}
              fontWeight={"bold"}
              color={useColorModeValue('gray.800', 'white')}
              _hover={{color: useColorModeValue('gray.600', 'gray.200')}}
            >
              Todo Family 2.0
            </Text>
          </Link>
        </NextLink>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
        p={2}
      >
        <NavItem icon={MdHome} href={"/dashboard"}>Principal</NavItem>
        <NavItem icon={HiCollection} href={"/dashboard/products"} >
          <>
            Produtos
            {/*<Icon*/}
            {/*  as={MdKeyboardArrowRight}*/}
            {/*  ml="auto"*/}
            {/*  transform={products.isOpen && "rotate(90deg)"}*/}
            {/*/>*/}
          </>
        </NavItem>
        {/*<Collapse in={products.isOpen}>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Shopify*/}
        {/*  </NavItem>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Slack*/}
        {/*  </NavItem>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Zapier*/}
        {/*  </NavItem>*/}
        {/*</Collapse>*/}


        <NavItem icon={FaClipboardCheck} href={"/users"}>Usuários</NavItem>
        {/*<NavItem icon={HiCode} href={"#"} onClick={integrations.onToggle}>*/}
        {/*  <>*/}
        {/*    Integrations*/}
        {/*    <Icon*/}
        {/*      as={MdKeyboardArrowRight}*/}
        {/*      ml="auto"*/}
        {/*      transform={integrations.isOpen && "rotate(90deg)"}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*</NavItem>*/}
        {/*<Collapse in={integrations.isOpen}>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Shopify*/}
        {/*  </NavItem>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Slack*/}
        {/*  </NavItem>*/}
        {/*  <NavItem href={"/dashboard/users"} pl="12" py="2">*/}
        {/*    Zapier*/}
        {/*  </NavItem>*/}
        {/*</Collapse>*/}
        {/*<NavItem href={"/dashboard/users"} icon={AiFillGift}>Gift Card</NavItem>*/}
        {/*<NavItem href={"/dashboard/users"} icon={BsGearFill}>Configurações</NavItem>*/}
      </Flex>
    </Box>
  )
};
