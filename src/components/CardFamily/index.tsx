import { Avatar, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";


type CardFamilyProps = {
  familyName: string;
}

export function CardFamily({familyName}: CardFamilyProps) {
  return (
    <Flex w={"full"} h={"100px"} bg={"white"} borderRadius={"lg"}>
      <Flex p={"15px"} justify={"space-between"} alignItems={"center"} w={"full"}>
        <HStack spacing={"10px"}>
          <Avatar />
          <Text fontWeight={"medium"} fontSize={"lg"}>{`Familia ${familyName}`}</Text>
        </HStack>

        <Menu>
          <MenuButton
            as={IconButton}
            borderRadius={25}
            aria-label={"button account"}
            icon={<RiMore2Fill />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<ExternalLinkIcon />}>
              Arquivar Família
            </MenuItem>
            <MenuItem icon={<RepeatIcon />}>
              Editar Família
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
