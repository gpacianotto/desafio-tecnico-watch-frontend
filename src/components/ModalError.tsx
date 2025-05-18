import { Box, Modal, Typography } from "@mui/material";

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

export default function ModalError({ open, handleClose, message }: { open: boolean, handleClose: () => void, message: string }) {
  return <>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography color="error" id="modal-modal-title" variant="h6" component="h2">
          Erro!
        </Typography>
        <Typography style={{whiteSpace: "pre-line"}} id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
      </Box>
    </Modal>
  </>
}