import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  SvgIcon,
  ListItemButton,
  CircularProgress,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Conversation } from "../types/conversation";
import DeleteIcon from "../../public/delete.svg";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  conversations: Conversation[];
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  selectedConversationId: number;
  loading: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  conversations,
  onSelect,
  onDelete,
  onAdd,
  selectedConversationId,
  loading,
}) => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const content = (
    <Box className="w-72 h-full p-4">
      <Button
        variant="contained"
        fullWidth
        onClick={onAdd}
        startIcon={<AddCircleOutlineIcon />}
        sx={{
          backgroundColor: "#E6DBF9",
          color: "#371E6F",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          fontWeight: 600,
          textTransform: "none",
          padding: "12px 16px",
          "&:hover": {
            backgroundColor: "#d1c1f5",
          },
        }}
      >
        Conversations
      </Button>
      {loading ? (
        <Box className="flex justify-center items-center h-64">
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            maxHeight: "calc(100vh - 150px)",
            "&::-webkit-scrollbar": {
              width: "8px",
              display: "none",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c4b5fd",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f3e8ff",
              borderRadius: "10px",
            },
            scrollbarWidth: "none",
          }}
        >
          <List>
            {conversations.map((conv) => (
              <ListItemButton
                component="div"
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                selected={conv.id === selectedConversationId}
                className="flex justify-between"
              >
                <ListItemText primary={conv.name} />

                <IconButton
                  size="small"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(conv.id);
                  }}
                >
                  <SvgIcon component={DeleteIcon} />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );

  return isLargeScreen ? (
    <div className="h-full">{content}</div>
  ) : (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {content}
    </Drawer>
  );
};

export default Sidebar;
