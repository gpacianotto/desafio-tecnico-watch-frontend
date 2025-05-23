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

export default function ModalSuccess({ open, handleClose, message }: { open: boolean, handleClose: () => void, message: string }) {
  return <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color="success" id="modal-modal-title" variant="h6" component="h2">
          Sucesso!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Button onClick={handleClose} variant="contained" color="success" sx={{ mt: 2 }}>
          Fechar
        </Button>
      </Box>
    </Modal>
  </>
}