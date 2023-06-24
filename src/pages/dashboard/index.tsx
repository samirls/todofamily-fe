import SidebarWithHeader from "../../components/SideBar";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <SidebarWithHeader containerSize={"0xl"}>
      <Heading>Dashboard</Heading>
    </SidebarWithHeader>
  )
}
