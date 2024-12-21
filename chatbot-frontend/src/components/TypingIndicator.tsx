import { Box } from "@mui/material";

const TypingIndicator: React.FC = () => {
  return (
    <Box
      className="flex items-center space-x-1"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <span className="typing-ball bg-gray-400"></span>
      <span className="typing-ball bg-gray-400"></span>
      <span className="typing-ball bg-gray-400"></span>

      <style jsx>{`
        .typing-ball {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: typing 1.5s infinite ease-in-out;
        }
        .typing-ball:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-ball:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
      `}</style>
    </Box>
  );
};

export default TypingIndicator;
