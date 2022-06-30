import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
//Redux
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  const user = useSelector((state) => state.user.userSelected);

  const products = [];
  let total = Number((0).toFixed(2));
  const cart = useSelector((state) => state.data.checkProducts);
  cart.forEach((p) => {
    let product = {
      name: p.name,
      desc: `${p.stock} ${p.unit}`,
      price: `${p.total} €`,
    };
    total += Number(p.total);
    products.push(product);
  });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Resumen compra
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {total} €
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Socio
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "right" }}>
          <Typography gutterBottom style={{ marginTop: "2rem" }}>
            {user.nombre}
          </Typography>
          <Typography gutterBottom>N° socio: {user.nsocio}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
