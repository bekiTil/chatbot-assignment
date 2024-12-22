import { useState, useEffect, useRef } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  InputBase,
  SvgIcon,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Conversation, Message } from "../types/conversation";

import sendIcon from "../../public/send.svg";
import TypingIndicator from "./TypingIndicator";
import { formatDate } from "@/utils/formatDate";

type ChatboxProps = {
  messages: Message[];
  onSend: (text: string) => void;
  isBotTyping: boolean;
  onMenuClick: () => void;
  loading: boolean;
  conversation?: Conversation | null;
};

const Chatbox: React.FC<ChatboxProps> = ({
  messages,
  onSend,
  isBotTyping,
  onMenuClick,
  loading,
  conversation
}) => {
  const [input, setInput] = useState<string>("");

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box
      className="flex flex-col h-full p-5"
      sx={{ maxHeight: "calc(100vh - 100px)" }}
    >
      <Box
        sx={{ borderRadius: "40px" }}
        className="h-full flex flex-col bg-white"
      >
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ borderBottom: "1px solid #E0E0E0" }}
        >
          <Toolbar className="flex justify-between">
            <div className="flex items-center">
              <Avatar
                alt="Chatbot"
                src="../../chatbot-avatar.svg"
                className="mr-2"
              />
              <Typography variant="h6" color="inherit">
                Chatbot
              </Typography>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              className="lg:hidden"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          className="flex-1 overflow-y-auto p-4"
          sx={{
            maxHeight: "calc(100vh - 300px)",
            scrollbarWidth: "none", 
            "&::-webkit-scrollbar": { display: "none" }, 
          }}
        >
          {loading ? (
            <Box className="flex justify-center items-center h-full">
              <CircularProgress />
            </Box>
          ) : (
            <>
            {conversation?.createdAt && (
                <div className="flex justify-center my-4">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className="bg-gray-100 px-4 py-2 rounded-lg"
                  >
                     {formatDate(conversation.createdAt)}
                  </Typography>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start mb-4 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    alt={msg.sender === "user" ? "User" : "Chatbot"}
                    src={
                      msg.sender === "user"
                        ? "../../user-avatar.svg"
                        : "../../chatbot-avatar.svg"
                    }
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />

                 
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                    style={{
                      marginRight: msg.sender === "user" ? "10px" : "0", 
                      marginLeft: msg.sender === "bot" ? "10px" : "0", 
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isBotTyping && (
                <div className="flex items-center justify-start">
                  <Avatar
                    src="../../chatbot-avatar.svg"
                    sx={{
                      width: 40,
                      height: 40,
                      marginRight: "10px",
                    }}
                  />
                  <div className="bg-gray-200 rounded-lg px-4 py-2 text-black">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            
              <div ref={messageEndRef}></div>
            </>
          )}
        </Box>

       
        <InputArea
          disabled={isBotTyping}
          value={input}
          onChange={setInput}
          onSend={handleSend}
        />
      </Box>
    </Box>
  );
};

const InputArea: React.FC<{
  value: string;
  disabled: boolean;
  onChange: (e: string) => void;
  onSend: () => void;
}> = ({ value, disabled = false, onChange, onSend }) => {
  return (
    <Box
      className="p-4 m-4  flex items-center bg-[#ECE6F0]"
      sx={{
        borderRadius: "40px",
      }}
    >
    
      <InputBase
        placeholder="Reply to Chatbot"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
        fullWidth
        sx={{
          fontSize: "16px",
          color: "#666", 
        }}
      />


      <IconButton
        onClick={onSend}
        disabled={disabled}
        sx={{
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "transparent" },
          marginLeft: "8px",
        }}
      >
        <SvgIcon component={sendIcon} sx={{ color: "#666" }} />
      </IconButton>
    </Box>
  );
};

export default Chatbox;
