import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { FILL_CHECK_PRODUCTS } from "../redux/types";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">GreenProducts</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  title: {
    marginBottom: "2rem",
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  config: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(6),
    },
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(15),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Configuracion() {
  const classes = useStyles();

  //Categorias disponibles
  let fCategories = useSelector((state) => state.ui.fCategories);
  let vCategories = useSelector((state) => state.ui.vCategories);
  const tiers = [
    {
      title: "Categorías frutas",
      description: fCategories,
      buttonText: "Añadir",
    },
    {
      title: "Categoría verduras",
      description: vCategories,
      buttonText: "Añadir",
    },
  ];
  const configuraciones = [
    {
      title: "Alerta socio lleva sin venir: ",
      description: ["1 mes", "3 meses", "6 meses"],
    },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container className={classes.title}>
        <Typography variant="h6" align="center" color="textSecondary">
          GreenProducts Configuraciones
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={7} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined" color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {/* Configuraciones */}

          <Grid item xs={12} md={4}>
            {configuraciones.map((config) => (
              <div className={classes.config}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                  {config.title}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value="1 mes">
                    {config.description.map((item) => (
                      <FormControlLabel
                        value={item}
                        control={<Radio />}
                        label={item}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            ))}
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly"></Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </main>
  );
}
