import { Button, LightMode } from "@chakra-ui/react";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({isCurrent = false, number, onPageChange}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <LightMode>
        <Button size={"sm"}
                fontSize={"xs"}
                width={4}
                bg={"black"}
                color={"white"}
                disabled
                _disabled={{
                  bgColor: 'black',
                  cursor: 'default'
                }}>
          {number}
        </Button>
      </LightMode>
    )
  }

  return (
    <LightMode>
      <Button onClick={() => onPageChange(number - 1)}
              size="sm"
              fontSize="xs"
              width={4}
              color={"black"}
              bgColor="gray.200"
              _hover={{
                bg: 'gray.500'
              }}>
        {number}
      </Button>
    </LightMode>
  )
}
