import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const CustomModal = ({ open, setOpen, imageUrl }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#afcdb1",
    //border: "2px solid #afcdb1",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={imageUrl}
            height="400px"
            width="400px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CustomModal;
