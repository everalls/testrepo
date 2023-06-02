import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export interface ConfirmationDialogProps {
  title: string;
  warning?: string;
  message: string;
  open: boolean;
  onClose: (confirmed: boolean) => void;
}

export function ConfirmationDialog(props: ConfirmationDialogProps) {

  const handleCancel = () => {
    props.onClose(false);
  };

  const handleOk = () => {
    props.onClose(true);
  };

 
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%'} }}
      maxWidth="xs"
      open={props.open}
      keepMounted={true}
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent dividers>
       <div>{props.message}</div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}