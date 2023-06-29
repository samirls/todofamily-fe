import { Avatar, Flex, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { HiUserAdd } from "react-icons/hi";
import { AddMemberModal } from "../Modals/AddMemberModal";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { useDeleteFamily } from "../../hooks/family/useDeleteFamily";


type CardFamilyProps = {
  familyName: string;
  id: number;
}

export function CardFamily({familyName, id}: CardFamilyProps) {
  const deleteFamily = useDeleteFamily();

  const handleDeleteFamily = (id: number) => {
    deleteFamily.mutate(id);
  }

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
          <MenuList p={0}>
            <AddMemberModal
              familyId={id}
              trigger={(onOpen =>
                  <MenuItem icon={<HiUserAdd fontSize={"19px"} />} onClick={onOpen}>
                    Adicionar membro
                  </MenuItem>
              )} />
            <MenuItem isDisabled={true} icon={<EditIcon />}>
              Editar Família
            </MenuItem>
            <ConfirmationDialog
              mainColor={"white"}
              title={"Deletar Família"}
              description={"Deseja deletar está família? Esta ação não pode ser desfeita."}
              buttonText={"Deletar"}
              onOk={() => handleDeleteFamily(id)}
              trigger={(onOpen) =>
                <MenuItem onClick={onOpen}
                          color={"red"}
                          icon={<DeleteIcon color={"red"} />}
                >
                  Excluir Família
                </MenuItem>
              }
            />
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}
