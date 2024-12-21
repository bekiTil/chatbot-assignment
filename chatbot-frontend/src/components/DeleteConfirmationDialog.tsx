import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{conversationName}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default DeleteConfirmationDialog;
  