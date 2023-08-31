import SidebarWithHeader from "./components/shared/SideBar.jsx";
import {Box, Text} from "@chakra-ui/react";

const Home = () => {

  return (
      <SidebarWithHeader>
          <Box py={12} px={6}>
            <Box>
              <Text fontSize={"4xl"} fontWeight={"bold"} mb={8}>
                Home Page
              </Text>
            </Box>
          </Box>
      </SidebarWithHeader>
)
}

export default Home;