import {
  Box,
  Button, Checkbox,
  Flex,
  HStack,
  IconButton, Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue, VStack
} from '@chakra-ui/react'
import NextLink from 'next/link';
import CTag from "../../Tag";
import React from "react";

class Users {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
  createdAt: string;
  lastAccess: string;
}

type UserTableProps = {
  content: Users[];
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
  handleTableHeadButtonClick?: (activeButton: string) => void;
}

export default function UserTable({
  content,
  onDeleteUser,
  isLoading,
  error,
  handleTableHeadButtonClick
}: UserTableProps) {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});

  return (
    isLoading ? (
      <Flex justify="center">
        <Spinner />
      </Flex>
    ) : error ? (
      <Flex justify="center">
        <Text>Falha ao obter dados dos usuários</Text>
      </Flex>
    ) : (
      <>
        <Table variant={isMobile ? 'unstyled' : 'simple'} bg={"white"}>
          {!isMobile && (
            <Thead borderTop={"1px"} borderColor={"gray.100"} h={"35px"} bg={"gray.50"}>
              <Tr>
                <Th pl={5} pt={0} pr={0} pb={0} textAlign="start" maxW={"20px"} minW={"60px"} w={"60px"}>
                  <Checkbox colorScheme={"blue"} />
                </Th>
                <Th pl={5} pt={2} pb={1} textAlign="start">Nome</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Admin</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Status</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Criado em</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Último Acesso</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {content.map((user) => (
              <Tr
                key={user.id}
                _hover={{bg: "gray.10"}}
                h={"57px"}
              >
                {isMobile ? (
                  <Td p={"5px"}>
                    <NextLink href={`/users/${user.id}`} passHref>
                      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm">
                        <VStack spacing={"0"} justify={"flex-start"} alignItems={"flex-start"} mb={"10px"}>
                          <Text fontSize="md" fontWeight="medium" color="black.400">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </VStack>
                        <VStack spacing={"0"} justify={"flex-start"} alignItems={"flex-start"}>
                          {user.active ? (
                            <CTag colorScheme={"green"} label={"ATIVO"} />
                          ) : (
                            <CTag colorScheme={"red"} label={"INATIVO"} />
                          )}
                        </VStack>
                      </Box>
                    </NextLink>
                  </Td>
                ) : (
                  <>
                    <Td pl={5} pt={0} pr={0} pb={0} m={0}>
                      <Checkbox />
                    </Td>
                    <Td pl={5} pt={2} pb={1}>
                      <Box>
                        <NextLink
                          href={{
                            pathname: "/users/[id]",
                            query: {id: user.id},
                          }}
                          passHref
                        >
                          <Link>
                            <Text fontSize="md" fontWeight="medium" color="black.400">
                              {user.name}
                            </Text>
                          </Link>
                        </NextLink>
                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                      </Box>
                    </Td>
                    <Td pl={5} pr={5}>
                      <Flex justify="center">
                        {user.admin ? (
                          <CTag colorScheme={"green"} label={"SIM"} />
                        ) : (
                          <CTag colorScheme={"red"} label={"NAO"} />
                        )}
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        {user.active ? (
                          <CTag colorScheme={"green"} label={"Ativo"} />
                        ) : (
                          <CTag colorScheme={"red"} label={"Ativo"} />
                        )}
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        <Text fontWeight="medium">{user.createdAt}</Text>
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        <Text fontWeight="medium">{user.lastAccess}</Text>
                      </Flex>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </>
    )
  );
}
