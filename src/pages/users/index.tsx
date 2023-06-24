import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import SidebarWithHeader from "../../components/SideBar";
// import { useDeleteUser } from "../../../hooks/user/useDeleteUser";
import { useUsers } from "../../hooks/useUsers";
import { Pagination } from "../../components/Pagination";
import UserTable from "../../components/Tables/users/UserTable";
import HeadingTable from "../../components/Tables/HeadingTable";
import { EmptyResultsBox } from "../../components/Tables/components/EmptyResultsBox";
import { InternalTableHead } from "../../components/Tables/components/InternalTableHead";

interface Options {
  value: string;
  label: string;
  active?: boolean
}

const buttonOptions: Options[] = [
  {value: 'all', label: 'Tudo', active: false},
  {value: 'active', label: 'Ativo', active: false},
  {value: 'inactive', label: 'Inativo', active: false},
  {value: 'archived', label: 'Arquivado', active: true},
];

const menuOptions: Options[] = [
  { value: 'name', label: 'Nomes' },
  { value: 'created_at', label: 'Data de criação' },
  { value: 'active', label: 'Ativo' },
  { value: 'admin', label: 'Administradores' },
];

export default function UserList() {
  const [page, setPage] = useState(0)
  // const {mutate: deleteUser} = useDeleteUser();
  const [active, setActive] = useState(null);
  const [sortComplete, setSortComplete] = useState('');
  const [selectedValue, setSelectedValue] = useState(10);
  const [keyword, setKeyword] = useState(null);


  const {data: users, isLoading, isFetching, error} = useUsers(page, sortComplete, active, keyword);

  const handleDeleteUser = (userId: number) => {
    // deleteUser(userId);
  };

  const handleTableHeadButtonClick = (activeButton: string) => {
    setActive(activeButton === "active" ? true : activeButton === "inactive" ? false : null);
  };

  const handleSortCompleteChange = (newSortComplete) => {
    setSortComplete(newSortComplete);
  };

  const handleSizeChange = (newValue) => {
    setSelectedValue(newValue);
    setPage(0);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <SidebarWithHeader containerSize={"full"}>
      <Box w={"full"} flexDirection={"row"}>
        <HeadingTable
          title={"Usuários"}
          titleButton={"Adicionar usuário"}
          path={"/users/create"}
          isLoading={isLoading}
          isFetching={isFetching}
          contentLength={users?.content.length}
        />
        <Box
          borderRadius={5}
          borderLeft={"1px"}
          borderBottom={"1px"}
          borderRight={"1px"}
          borderColor={"gray.100"}
          boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        >
          <InternalTableHead
            onTableHeadButtonClick={handleTableHeadButtonClick}
            onSortCompleteChange={handleSortCompleteChange}
            menuOptions={menuOptions}
            buttonsOptions={buttonOptions}
            onSearchBar={handleKeyword}
            activeSearchBar={false}
          />
          {
            users?.content.length === 0 ? (
              <EmptyResultsBox
                path={"/users/create"}
                title={"Nenhum usuário encontrado"}
                buttonText={"Adicionar usuário"}
              />
            ) : (
              <>
                <UserTable
                  content={users?.content}
                  onDeleteUser={handleDeleteUser}
                  isLoading={isLoading}
                  error={error}
                  handleTableHeadButtonClick={handleTableHeadButtonClick}
                />
                <Pagination
                  totalCountOfRegisters={users?.totalElements}
                  currentPage={page}
                  onPageChange={setPage}
                  registerPerPage={selectedValue}
                  handleSizeChange={handleSizeChange}
                  changePageSize={true}
                />
              </>
            )
          }
        </Box>
      </Box>
    </SidebarWithHeader>
  );
}
