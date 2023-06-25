import SidebarWithHeader from "../../components/SideBar";
import { Button, Flex, HStack, SimpleGrid, Spinner, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { FamilyModal } from "../../components/Modals/FamilyModal";
import { useFamily } from "../../hooks/family/useFamily";
import { CardFamily } from "../../components/CardFamily";

export default function Families() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const {data: families, isLoading} = useFamily();

  return (
    <SidebarWithHeader containerSize={"full"}>
      <Flex justifyContent={"space-between"} h={"60px"} alignItems={"center"} p={isMobile ? '5px' : '0px'}>
        <HStack spacing={"10px"}>
          <>
            <Text fontSize={"22px"} fontWeight={"medium"}>Famílias</Text>
            {isLoading ? (
              <Spinner size={"sm"} />
            ) : null}
          </>
        </HStack>
        <HStack>
          <FamilyModal
            trigger={(onOpen) =>
              <Button
                as={"a"}
                size={"sm"}
                fontSize={"sm"}
                fontWeight={"medium"}
                bg={"black"}
                color={"white"}
                onClick={onOpen}
                leftIcon={<RiAddLine fontSize={"20"} />}
              >
                Adicionar família
              </Button>
            }
          />
        </HStack>
      </Flex>
      <Flex w={"full"}>
        <SimpleGrid columns={{sm: 1, md: 2, xl: 3}} spacing='20px' w={"full"}>
          {
            families?.map((family) => (
              <CardFamily
                key={family.id}
                id={family.id}
                familyName={family.name}
              />
            ))
          }
        </SimpleGrid>
      </Flex>
    </SidebarWithHeader>
  )
}
