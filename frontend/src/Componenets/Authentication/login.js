import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useImperativeHandle, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Userlogin from "../../Actions/User_login";
const Login = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting user data
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading: userloading, error, UserInfo } = UserDetails;

  const history = useHistory();
  //Making instance of toast
  const toast = useToast();
  //States to take care of inputs
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [show, setshow] = useState(false);
  //Function to deal with profile photo upload

  //loading
  const [loading, setloading] = useState(false);
  const postdetails = (file) => {};
  //Function to submit data
  const SubmitHandler = async () => {
    try {
      setloading(true);
      if (!email || !password || !name) {
        toast({
          title: "Enter all fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
        return;
      }

      dispatch(Userlogin(email, password));

      setTimeout(() => {
        setloading(false);
        if (UserInfo) {
          toast({
            title: "User logged in",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          history.push("/chat");
        }
        else{
          toast({
            title: "User not log in",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      }, 2000);
    } catch (e) {
      console.log(e);
      setloading(false);
      toast({
        title: "Error occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <VStack spacing={"5px"}>
      {/* Any form component can be wrapped inside fromcontrol component */}
      <FormControl id="firstname" isRequired>
        {/* Form control has two things label and input */}
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        {/* Input group is used when there are to be more then one things for input */}
        {/* It basically has left and right elements */}
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button
              h="2rem"
              size={"sm"}
              onClick={() => {
                show === true ? setshow(false) : setshow(true);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => SubmitHandler()}
        isLoading={userloading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
