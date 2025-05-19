import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalGenericYesNo(
  { 
    open, 
    handleClose, 
    message, 
    question,
    handleYes,
    handleNo
  }: 
  { 
    open: boolean, 
    handleClose: () => void, 
    message: string,
    question: string,
    handleYes: () => void,
    handleNo: () => void
  }) {
  return <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color="info" id="modal-modal-title" variant="h6" component="h2">
          {question}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={handleNo} variant="contained" color="error" sx={{ mt: 2 }}>
          Não
        </Button>
        <Button onClick={handleYes} variant="contained" color="success" sx={{ mt: 2 }}>
          Sim
        </Button>
      </Box>
    </Modal>
  </>
}