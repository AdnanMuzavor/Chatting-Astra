import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../Componenets/Authentication/login";
import Signup from "../Componenets/Authentication/signup";
import Chatlist from "./Chatlist";
import Chatpage from "./ChatPage";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting user data
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, error, UserInfo } = UserDetails;

  const history = useHistory();
  useEffect(async () => {
    console.log("Home page");
    console.log(UserInfo)
    if (UserInfo.name && UserInfo!=={}) {
      history.push("/chat");
    }
  }, [history, UserInfo]);
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          bg={"#ffff"}
          justifyContent="center"
          padding={3}
          d="flex"
          w="100%"
          m="40px 0 15px 0"
          borderRadius={"lg"}
          borderWidth="1px"
        >
          <Text fontSize="3xl" fontFamily="word-sans">
            Talk-to-tive
          </Text>
        </Box>
        <div className="container">
          <Tabs variant={"soft-rounded"}>
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign-up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default Homepage;
