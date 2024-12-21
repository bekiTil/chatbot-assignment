import { useState, useEffect, useRef } from "react";
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, InputBase, SvgIcon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Message } from "../types/conversation";

import { SendOutlined } from "@mui/icons-material";
import sendIcon from '../../public/send.svg'

type ChatboxProps = {
  messages: Message[];
  onSend: (text: string) => void;
  isBotTyping: boolean;
  onMenuClick: () => void; // Prop to trigger opening the Drawer
};

const Chatbox: React.FC<ChatboxProps> = ({ messages, onSend, isBotTyping, onMenuClick }) => {
  const [input, setInput] = useState<string>("");
  console.log(messages);

  // Reference to the message container
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  // Scroll to the bottom of the messages whenever `messages` changes
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box className="flex flex-col h-screen p-5">
      {/* Outer Box to contain both message area and input */}
      <Box sx={{ borderRadius: "40px" }} className="h-full flex flex-col bg-white">
        {/* App Bar */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar className="flex justify-between">
            <div className="flex items-center">
              <Avatar alt="Chatbot" src="/chatbot-avatar.png" className="mr-2" />
              <Typography variant="h6" color="inherit">
                Chatbot
              </Typography>
            </div>
            {/* Menu Icon for Small Screens */}
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={onMenuClick} className="lg:hidden">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Message Area */}
        <Box
          className="flex-1 overflow-y-auto p-4"
          sx={{
            scrollbarWidth: "none", // Hides scrollbar in Firefox
            "&::-webkit-scrollbar": { display: "none" }, // Hides scrollbar in WebKit-based browsers
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
           {isBotTyping && (
          <div className="flex items-center justify-start">
            <div className="bg-gray-200 rounded-lg px-4 py-2 text-black">
              <span>...</span>
            </div>
          </div>
        )}
          {/* Empty div to ensure scrolling to the bottom */}
          <div ref={messageEndRef}></div>
        </Box>

        {/* Input Area */}
        <InputArea   disabled={isBotTyping} value={input} onChange={setInput} onSend={handleSend} />
      </Box>
    </Box>
  );
};

const InputArea: React.FC<{ value: string; disabled:boolean, onChange: (e: string) => void; onSend: () => void }> = ({
  value,
  disabled=false,
  onChange,
  onSend,
}) => {
  return (
    <Box
      className="p-4 m-4  flex items-center bg-[#ECE6F0]"
      sx={{
        borderRadius: "40px",
      }}
    >
      {/* Input field */}
      <InputBase
        placeholder="Reply to Chatbot"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
        fullWidth
        sx={{
          fontSize: "16px",
          color: "#666", // Placeholder and text color
        }}
      />

      {/* Send Button */}
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
