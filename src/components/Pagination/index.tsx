import { Box, HStack, Select, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";
import { useState } from "react";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  changePageSize?: boolean;
  handleSizeChange?: (value: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page >= 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 8,
  currentPage = 1,
  onPageChange,
  changePageSize = false,
  handleSizeChange
}: PaginationProps) {

  const [selectedValue, setSelectedValue] = useState<number>(registerPerPage);

  const startIndex: number = (currentPage - 1) * selectedValue + 1;
  const endIndex: number = Math.min(currentPage * selectedValue, totalCountOfRegisters);
  const adjustedStartIndex: number = Math.min(startIndex, totalCountOfRegisters);

  const lastPage: number = totalCountOfRegisters % registerPerPage == 0 ? (totalCountOfRegisters / registerPerPage) - 1 : Math.floor(totalCountOfRegisters / registerPerPage)
  const previousPages: number[] = currentPage > 0 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages: number[] = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  return (
    <Stack
      direction={"row"}
      mt={0}
      justify={"space-between"}
      align={"center"}
      spacing={"5px"}
      pt={3}
      pb={3}
      pl={4}
      pr={2}
      bg={"white"}
      borderBottomRadius={"5px"}
    >
      {changePageSize && (
        <HStack flexDirection="row" alignItems="center">
          <HStack>
            <Text>Exibir:</Text>
            <Select
              size="sm"
              variant="outline"
              value={selectedValue}
              onChange={(event) => {
                const value = parseInt(event.target.value);
                setSelectedValue(value);
                onPageChange(1);
                handleSizeChange(value);
              }}
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={15}>15 por página</option>
              <option value={20}>20 por página</option>
            </Select>
          </HStack>
          <Box>
            Exibindo <strong>1</strong> até <strong>{registerPerPage}</strong> de <strong>{totalCountOfRegisters}</strong> resultados
          </Box>
        </HStack>
      )}

      <Stack direction={"row"} spacing={"3px"}>
        {currentPage > 1 && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) &&
                <Text color={"gray.300"} width={8}>...</Text>
            }
          </>
        )}

        {
          previousPages.length > 0 && previousPages.map(page => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page + 1} />
          })}

        <PaginationItem onPageChange={onPageChange} number={currentPage + 1} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page + 1} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text>}
            <PaginationItem onPageChange={onPageChange} number={lastPage + 1} />
          </>
        )}

      </Stack>
    </Stack>
  )
}
