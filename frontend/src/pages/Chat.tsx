import React, { useEffect, useLayoutEffect, useRef, useState, ChangeEvent } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";

import toast from "react-hot-toast";
import myGif from "../components/shared/hi-robot.gif";
type Message = {
  role: "user" | "assistant";
  content: string;
};
const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    if (inputValue.trim() !== ''){
      const content = inputRef.current?.value as string;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage: Message = { role: "user", content };
      setChatMessages((prev) => [...prev, newMessage]);
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      //
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  const [selectedValue, setSelectedValue] = useState<string>('');

  // Handler function to update the selected value
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
          p: "1vw"
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "80vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: "auto",
          }}
        >

          <Avatar
            sx={{
              mx: "auto",
              my: "2vh",
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {"SU"}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", textAlign: "center" }}>
            Sabancı University Course Assistant
            
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", textAlign: "center" , p: "2vw"}}>
            You can ask any question related to Sabancı University courses! 
          </Typography>

          <div>
            <Typography sx={{ mx: "auto", fontFamily: "work sans", textAlign: "center" , p: "2vw"}}>
              <div>
              <label htmlFor="dropdown">Select the course you would like to ask about:</label>
              </div>
              <select id="dropdown" value={selectedValue} onChange={handleSelectChange} style={{ padding: 'auto',
                                                                                                 width: '100%',
                                                                                                 height: '75px',
                                                                                                 textAlign: 'center',
                                                                                                 fontSize: '24px',
                                                                                                 color: "white",
                                                                                                 fontFamily: "work sans", 
                                                                                                 borderRadius: '10px', 
                                                                                                 border: '3px solid #ccc',
                                                                                                 backgroundColor: '#004288'}}>
                <option value="Empty">Select...</option>
                <option value="CS305">CS305</option>
                <option value="IF100">IF100</option>
                <option value="CS204">CS204</option>
                <option value="CS201">CS201</option>
                <option value="CS302">CS302</option>
                <option value="CS310">CS310</option>
                <option value="CS307">CS307</option>
                <option value="CS405">CS405</option>
                <option value="CS412">CS412</option>
                <option value="CS437">CS437</option>
                <option value="CS308">CS308</option>
                <option value="CS419">CS419</option>

              </select>             
            </Typography>

            
          </div>

          <Typography sx={{ mx: "auto", fontFamily: "work sans", textAlign: "center" , p: "1vw"}}>
            <img   
              src={myGif}
              alt="moving image"
              width={"150vw"}
              height={"150vh"}
            />
          </Typography>

          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Title About Related Question
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            gap: 2,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          {selectedValue !== "Empty" && (
            <>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    handleSubmit();
                    setInputValue('');
                  }
                }}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  padding: "30px",
                  border: "none",
                  outline: "none",
                  color: "white",
                  fontSize: "20px",
                }}
              />
              <IconButton 
                onClick={handleSubmit} 
                onKeyUp={(event) => {
                  if (event.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                sx={{ color: "white", mx: 1 }}>
                <IoMdSend />
              </IconButton>
            </>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default Chat;