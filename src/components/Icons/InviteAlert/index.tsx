import {
  Button,
  chakra, Divider, Flex, HStack,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text, VStack,
} from "@chakra-ui/react";
import React from "react";
import { Invite } from "../../../hooks/users/useMe";
import { useInviteAccept } from "../../../hooks/invite/useInviteAccept";


type CardPickProps = {
  value?: number;
  userId: number;
  invites: Invite[] | null;
}

export default function InviteAlert({value = 0, invites, userId}: CardPickProps) {

  const accept = useInviteAccept();

  const handleAccept = async (invite: Invite) => {
    const familyId = invite.idFamily;
    const familyCode = invite.inviteCode;

    await accept.mutate({userId, familyId, familyCode})
  }

  return (
    <chakra.span pos="relative" display="inline-block" mr={"25px"}>
      <>
        <Popover>
          <PopoverTrigger>
            <IconButton
              as="a"
              bg="inherit"
              borderRadius="xl"
              _hover={{
                bg: "none"
              }}
              aria-label="cart"
              size="sm"
              icon={
                <Icon
                  boxSize={6}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <svg
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    height="1.6em"
                    width="1.6em"
                  >
                    <path d="M256 32v17.88C328.5 61.39 384 124.2 384 200v33.4c0 45.4 15.5 89.5 43.8 125l14.9 18.6c5.8 7.2 6.9 17.1 2.9 25.4-4 8.3-12.4 13.6-21.6 13.6H24c-9.23 0-17.635-5.3-21.631-13.6A24.019 24.019 0 015.26 377l14.91-18.6C48.54 322.9 64 278.8 64 233.4V200c0-75.8 55.5-138.61 128-150.12V32c0-17.67 14.3-32 32-32s32 14.33 32 32zm-40 64c-57.4 0-104 46.6-104 104v33.4c0 47.9-13.88 94.6-39.69 134.6H375.7c-25.8-40-39.7-86.7-39.7-134.6V200c0-57.4-46.6-104-104-104h-16zm72 352c0 16.1-6.7 33.3-18.7 45.3S240.1 512 224 512c-17 0-33.3-6.7-45.3-18.7S160 464.1 160 448h128z" />
                  </svg>
                </Icon>
              }
            />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Convites</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody pb={0}>
                {invites && invites.length > 0 ? (
                  invites.map((invite) => (
                    <Flex w={"full"} h={"auto"} mt={3}>
                      <VStack textAlign={"center"}>
                        <Text>
                          Você foi convidado para participar da família{" "}
                          <span style={{ fontWeight: "bold" }}>{invite.invitedFamilyName}</span>{" "}deseja aceitar?
                        </Text>
                        <HStack>
                          <Button size={"sm"} fontWeight={"medium"}>Recusar</Button>
                          <Button
                            size={"sm"}
                            color={"white"}
                            bg={"black"}
                            onClick={() => handleAccept(invite)}
                            fontWeight={"medium"}
                          >
                            Aceitar
                          </Button>
                        </HStack>
                        <Divider />
                      </VStack>
                    </Flex>
                  ))
                ) : (
                  <Flex h={"40px"} justify={"center"}>
                    <Text mt={"5px"} fontWeight={"medium"} fontSize={"md"}>Não há convites</Text>
                  </Flex>
                )}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
        {
          value > 0 ?
            (
              <chakra.span
                pos="absolute"
                top="7px"
                right="6px"
                px={2}
                py={1}
                fontSize="9px"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              >
                {value}
              </chakra.span>
            ) : null
        }
      </>
    </chakra.span>
  )
}
