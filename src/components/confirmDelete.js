import React, { useState, useEffect } from "react";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../redux/actions/userActions";
import { deleteProduct } from "../redux/actions/dataActions";
import { CLEAR_USER, CLEAR_PRODUCT } from "../redux/types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function DeleteModal({ id, target }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    dispatch({
      type: CLEAR_USER,
    });
    dispatch({
      type: CLEAR_PRODUCT,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (target === "producto") dispatch(deleteProduct(id));
    else dispatch(deleteUser(id));
  };
  //Obtener la respuesta desde la tienda de redux para el usuario
  const deleting = useSelector((state) => state.user.deleting);
  const deleted = useSelector((state) => state.user.deleted);
  const resDelete = useSelector((state) => state.user.resDelete);
  //Obtener la respuesta desde la tienda de redux para el producto
  const deletingProduct = useSelector((state) => state.data.isDeleting);
  const productDeleted = useSelector((state) => state.data.deleted);
  const msgDelete = useSelector((state) => state.data.msgDelete);

  useEffect(() => {
    if (deleted || productDeleted) {
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, []);

  //El cuerpo del modal
  const body = (
    <div className={classes.paper}>
      <Typography variant="h6">
        Los datos no podrán ser recuperados. ¿Desea continuar?
      </Typography>
      <div className={classes.root} style={{ textAlign: "center" }}>
        <Button variant="outlined" color="primary" onClick={handleSubmit}>
          Eliminar
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          Cancelar
        </Button>
      </div>
      {deleting || deletingProduct ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}
      <div className={deleted ? "validForm" : "invalidForm"}>{resDelete}</div>
      <div className={productDeleted ? "validForm" : "invalidForm"}>
        {msgDelete}
      </div>
    </div>
  );

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteForeverIcon color="error" />
      </IconButton>
      <Modal open={open} onClose={handleClose} className={classes.modal}>
        {body}
      </Modal>
    </div>
  );
}
