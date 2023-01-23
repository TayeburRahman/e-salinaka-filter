import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #2a7a6f",
  boxShadow: 15,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  openChild: boolean;
  setOpenChild: (setOpenChild: boolean) => void;
  setRefresh: (setRefresh: any) => void;
  viewData: any;
};

const ChildModalProduct = ({
  openChild,
  setOpenChild,
  viewData,
  setRefresh,
}: Props) => {
  const handleClose = () => {
    setOpenChild(false);
  };
  const handelOnclick = (id: any) => {
    fetch(`https://e-salinaka.onrender.com/api/v1/product/remove/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res?.status === 200) {
          setRefresh(0 ? 1 : 0);
          setOpenChild(false);
        }
      })
      .then((res) => {});
  };
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={openChild}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <CardMedia
            component="img"
            height="100"
            image={viewData?.image}
            alt="green iguana"
          />
          <h2 id="child-modal-title">{viewData.name}</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => handelOnclick(viewData._id)}
            size="small"
            color="primary"
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ChildModalProduct;
