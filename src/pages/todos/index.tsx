import SidebarWithHeader from "../../components/SideBar";
import { Button, Checkbox, Divider, Flex, HStack, IconButton, Text, useMediaQuery, VStack } from "@chakra-ui/react";
import { useFamily } from "../../hooks/family/useFamily";
import { RiAddLine } from "react-icons/ri";
import { TodoModal } from "../../components/Modals/TodoModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useTodoChangeStatus } from "../../hooks/todos/useTodoChangeStatus";
import { useDeleteTodo } from "../../hooks/todos/useDeleteTodo";

export default function Todo() {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const {data: families, isLoading} = useFamily();
  const changeStatusMutation = useTodoChangeStatus();
  const deleteTodoMutation = useDeleteTodo()

  const handleTodoChangeStatus = (todoId: number, status: boolean) => {
    changeStatusMutation.mutate({id: todoId, status});
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodoMutation.mutate(todoId);
  }

  return (
    <SidebarWithHeader containerSize={"7xl"}>
      <VStack w={"full"}>
        {
          families?.map((family) => (
            <Flex borderRadius={5}
                  p={3}
                  w={"full"}
                  borderLeft={"1px"}
                  borderBottom={"1px"}
                  borderRight={"1px"}
                  bg={"white"}
                  borderColor={"gray.100"}
                  boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)">

              <Flex flexDirection={"column"} w={"full"} alignItems={"center"}>
                <Flex alignItems={"center"} justify={"space-between"} w={"full"}>
                  <Text fontSize={"1.2rem"} fontWeight={"medium"}>Família {family.name}</Text>
                  {isMobile ? (
                    <TodoModal
                      familyId={family.id}
                      trigger={(onOpen) => (
                        <IconButton
                          color={"white"}
                          bg={"black"}
                          size={"sm"}
                          isRound={true}
                          aria-label={"edit"}
                          onClick={onOpen}
                          icon={<RiAddLine fontSize={"20"} />}
                        />
                      )}
                    />
                  ) : (
                    <TodoModal
                      familyId={family.id}
                      trigger={(onOpen) => (
                        <Button
                          onClick={onOpen}
                          mt={"10px"}
                          as={"a"}
                          size={"sm"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                          bg={"black"}
                          color={"white"}
                          w={"10rem"}
                          leftIcon={<RiAddLine fontSize={"20"} />}
                        >
                          Adicionar tarefa
                        </Button>
                      )}
                    />
                  )}
                </Flex>
                <Divider mt={"10px"} />
                {
                  family?.todos.length > 0 ? (
                    family.todos.map((todo) => (
                      <VStack w={"full"} key={todo.id} spacing={"10px"}>
                        <Flex w={"full"} h={"auto"} mt={"10px"} mb={0} alignItems={"center"}>
                          <HStack w={"full"}>
                            <Checkbox
                              isChecked={todo.concluded}
                              onChange={() => handleTodoChangeStatus(todo.id, !todo.concluded)}
                            />
                            <Text ml={"10px"}
                                  fontSize={"1.1rem"}
                                  fontWeight={"medium"}
                                  color={"black"}
                                  textDecoration={todo.concluded ? "line-through" : "none"}
                                  style={{ verticalAlign: "middle" }}
                            >
                              {todo.todoName}
                            </Text>
                          </HStack>
                          <HStack spacing={1}>
                            <IconButton
                              colorScheme={"red"}
                              size={"sm"}
                              isRound={true}
                              aria-label={"edit"}
                              onClick={() => handleDeleteTodo(todo.id)}
                              icon={<DeleteIcon fontSize={"13px"} />}
                            />
                          </HStack>
                        </Flex>
                      </VStack>
                    ))
                  ) : (
                    <Flex w={"300px"} h={"150px"} flexDirection={"column"} textAlign={"center"} justify={"center"}
                          alignItems={"center"}>
                      <Text fontSize={"1.2rem"} fontWeight={"bold"}>Não há tarefas a serem realizadas</Text>
                    </Flex>
                  )
                }
              </Flex>
            </Flex>
          ))
        }
      </VStack>
    </SidebarWithHeader>
  )
}
