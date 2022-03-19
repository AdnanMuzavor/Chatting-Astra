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
import { UserSignup } from "../../Actions/User_signup";
const Signup = () => {
  //Getting dispatch
  const dispatch = useDispatch();
  //Getting state from redux
  const UserDetails = useSelector((state) => state.UserDetails);
  //Destructing user
  const { loading: userloading, UserInfo, error } = UserDetails;

  //To use history to push onto other page
  const history = useHistory();
  //States to take care of inputs
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [pic, setpic] = useState("");
  const [show, setshow] = useState(false);

  const [loading, setloading] = useState(false);
  //Creating instance of toast
  const toast = useToast();

  //Function to deal with profile photo upload
  const postdetails = async (file2) => {
    console.log(file2);
    setloading(true);
    //PART-I
    //If file is not selected then giving a toast
    if (file2 === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    //PART-II
    //Going ahead with upload using form data
    try {
      if (file2.type === "image/jpeg" || file2.type === "image/png") {
        const data = new FormData(); //Creatring form data
        data.append("file", file2);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "personal-portfolio-website-for-use");
        const data2 = await fetch(
          "https://api.cloudinary.com/v1_1/personal-portfolio-website-for-use/image/upload",
          {
            method: "post",
            body: data,
          }
        );
        const uploaded = await data2.json();
        console.log(uploaded);
        setloading(false);
        setpic(uploaded.secure_url);
      } else {
        toast({
          title: "Invalid image format",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
        return;
      }
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };
  //Function to submit data
  const SubmitHandler = async () => {
    setloading(true);
    //Checking if any of fields are not entered
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
    //Checking if password and confirm password does'nt match
    if (password !== confirmpassword) {
      toast({
        title: "Password and confirm password should be same",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }
    //Else sending data to backend
    try {
      //Ussing redux
      dispatch(UserSignup(name, email, password, pic));
      if (UserInfo) {
        toast({
          title: "Registration done.",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        history.push("/chat");
      }

      //Using direct API call
      // const { data } = await axios.post(
      //   "/api/user",
      //   { name, email, password, pic },
      //   {
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   }
      // );
      // console.log(data);
      // toast({
      //   title: "Registration done.",
      //   status: "warning",
      //   duration: 5000,
      //   isClosable: true,
      //   position: "bottom",
      // });
      // //Storing this data in local storage
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // setloading(false);
      // history.push("/chats");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error occured",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
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

      <FormControl id="password" isRequired>
        <FormLabel>confirm password</FormLabel>
        {/* Input group is used when there are to be more then one things for input */}
        {/* It basically has left and right elements */}
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setconfirmpassword(e.target.value)}
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

      <FormControl id="Pic" isRequired>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          placeholder="Upload your pic"
          onChange={(e) => postdetails(e.target.files[0])}
        ></Input>
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => SubmitHandler()}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
