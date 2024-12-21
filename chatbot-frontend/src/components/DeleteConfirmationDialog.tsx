import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";

type DeleteConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  conversationName: string;
};

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  conversationName,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "16px",
          backgroundColor: "#FEF7FF",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
        Confirm Delete
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          sx={{ fontSize: "16px", textAlign: "center", color: "#333" }}
        >
          Are you sure you want to delete <strong>{conversationName}</strong>?
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", padding: "16px" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#E6DBF9",
            color: "#371E6F",
            borderRadius: "24px",
            textTransform: "none",
            padding: "8px 24px",
            width: "150px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#d1c1f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          
          sx={{
            backgroundColor: "#D32F2F",
            color: "white",
            borderRadius: "24px",
            textTransform: "none",
            padding: "8px 24px",
            width: "150px",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
