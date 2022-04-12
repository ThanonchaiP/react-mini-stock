import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { imageUrl } from "../../../../Constants";
import { Product } from "../../../../types/product.type";

type Props = {
  setOpenDialog: any;
  openDialog: boolean;
  selectedProduct: Product | null;
  handleDeleteConfirm: () => void;
};

const DeleteDialog = ({ setOpenDialog, openDialog, selectedProduct, handleDeleteConfirm }: Props) => {
  React.useEffect(() => {
    console.log("delete Dialog");
  }, []);

  return (
    <>
      <Dialog
        open={openDialog}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {selectedProduct && (
          <DialogTitle id="alert-dialog-slide-title">
            <img
              src={`${imageUrl}/images/${selectedProduct!.image}?dummy=${Math.random()}`}
              style={{ width: 100, borderRadius: "5%" }}
              alt=""
            />
            <br />
            Confirm to delete the product? : {selectedProduct!.name}
          </DialogTitle>
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">You cannot restore deleted product.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="info">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
