import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/socios.css";
import DeleteModal from "../components/confirmDelete";
import NumberFormatCustom from "../components/numberFormat";
//Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LinearProgress from "@material-ui/core/LinearProgress";
import LastPageIcon from "@material-ui/icons/LastPage";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
//Redux
import {
  addNewProduct,
  getProducts,
  updateProduct,
} from "../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginBottom: "1.5rem",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: 0,
  },
  layout: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  header: {
    fontWeight: "bold",
    fontSize: "1rem",
    padding: ".5rem",
  },
  cell: {
    padding: ".4rem",
  },
  textField: {
    width: "50ch",
  },
  container: {
    border: "2px solid rgb(56, 28, 56)",
  },
}));

export default function Productos(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    section: "Fruta",
    category: null,
    name: "",
    price: "",
    stock: "",
    unit: "Kg",
  });

  const [error, setError] = useState({
    category: false,
    name: false,
    price: false,
  });
  const [msg, setMsg] = useState({
    category: "¡Selecciona una categoría!",
    name: "Nombre invalido",
    price: "Precio invalido",
  });
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  //Guardar los datos cambiados en los inputs
  function handleChange(e) {
    let id = e.target.id;
    let value = e.target.value;
    //Transformar en formato correcto el nombre del producto
    if (id === "name") {
      value = value.toLowerCase();
      value = value.replace(/(^|\s)\S/g, (l) => l.toUpperCase());
    }
    setNewProduct({
      ...newProduct,
      [id]: value,
    });
    setError({
      ...error,
      [id]: false,
    });
  }
  //Guardar los datos cambiados en los inputs con formato especial
  function handleChangeFormat(e) {
    let name = e.target.name;
    let value = e.target.value;

    setNewProduct({
      ...newProduct,
      [name]: value,
    });
    setError({
      ...error,
      [name]: false,
    });
  }
  //Guardar los datos cambiados en los botones radio
  function handleRadio(e) {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  }
  //Gestionar campo nombre
  const handleBlurName = (e) => {
    if (e.target.value.length < 3) setError({ ...error, name: true });
    else setError({ ...error, name: false });
  };
  //Gestionar campo precio
  const handleBlurPrice = (e) => {
    if (e.target.value <= 0) setError({ ...error, price: true });
    else setError({ ...error, price: false });
  };

  //Añadir el producto a la bbdd
  const addProduct = (e) => {
    if (e) e.preventDefault();
    //Validar la categoria
    if (!newProduct.category) {
      setError({ ...error, category: true });
      return;
    }
    //Validar el nombre
    if (newProduct.name === "") {
      setError({ ...error, name: true });
      return;
    }
    //Validar el precio
    if (newProduct.price === "") {
      setError({ ...error, price: true });
      return;
    }

    if (!edit) dispatch(addNewProduct(newProduct));
    else dispatch(updateProduct(newProduct.id, newProduct));

    setNewProduct({
      section: "Fruta",
      category: "",
      name: "",
      price: "",
      stock: "",
      unit: "Kg",
    });
    setEdit(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Estado obtener productos
  const products = useSelector((state) => state.data.products);
  const isLoading = useSelector((state) => state.data.isLoading);
  const errorGetUser = useSelector((state) => state.data.error);
  //Estado añadir producto
  const isAdding = useSelector((state) => state.data.isAdding);
  const failAdd = useSelector((state) => state.data.failAdd);
  const msgAdd = useSelector((state) => state.data.msgAdd);
  //Estado actualizar producto

  //Categorias disponibles
  let fCategories = useSelector((state) => state.ui.fCategories);
  let vCategories = useSelector((state) => state.ui.vCategories);

  const categoriesProps = {
    options: newProduct.section === "Fruta" ? fCategories : vCategories,
    getOptionLabel: (option) => option,
  };

  //Editar un producto
  const handleEdit = (id) => {
    products.forEach((p) => {
      if (p.id === id) {
        setNewProduct({
          ...p,
        });
        document.getElementById("name").focus();
        setError({ ...error, category: false });
        setEdit(true);
        return;
      }
    });
  };
  //Limpiar el formulario
  const clearForm = () => {
    setNewProduct({
      section: "Fruta",
      category: "",
      name: "",
      price: "",
      stock: "",
      unit: "Kg",
    });
    setEdit(false);
  };
  //Filtrar los productos
  const handleSearch = (text) => {
    setFilter(text);
  };
  const includes = (txtp, txt) => {
    let a = txtp.trim().toLowerCase();
    let b = txt.trim().toLowerCase();
    return a.includes(b);
  };
  let productsTable = products.filter((p) => {
    if (
      includes(p.name, filter) ||
      includes(p.section, filter) ||
      includes(p.category, filter)
    )
      return p;
  });

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Paper className={classes.layout}>
        <Typography component="h1" variant="h5" align="center">
          {!edit ? "Añadir producto" : "Actualizar producto"}
        </Typography>
        <Divider variant="middle" style={{ marginBottom: ".2rem" }} />
        <form noValidate autoComplete="off" onSubmit={addProduct}>
          <Grid container spacing={0} style={{ textAlign: "center" }}>
            <Grid item xs={6} sm={3}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="section"
                  value={newProduct.section}
                  onChange={handleRadio}
                >
                  <FormControlLabel
                    value="Fruta"
                    control={<Radio color="primary" />}
                    label="Fruta"
                  />
                  <FormControlLabel
                    value="Verdura"
                    control={<Radio color="primary" />}
                    label="Verduras y hortalizas"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                {...categoriesProps}
                id="categories"
                blurOnSelect
                value={newProduct.category}
                renderInput={(params) => (
                  <TextField {...params} label="Categoría" margin="normal" />
                )}
                onChange={(event, newValue) => {
                  setNewProduct({
                    ...newProduct,
                    category: newValue,
                  });
                  setError({ ...error, category: false });
                }}
              />
            </Grid>
            <Grid item xs={6} sm={3} style={{ marginTop: ".9rem" }}>
              <TextField
                value={newProduct.name}
                id="name"
                onChange={handleChange}
                label="Producto"
                error={error.name}
                onBlur={handleBlurName}
                helperText={error.name === true ? msg.name : ""}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                value={newProduct.price}
                error={error.price}
                style={{ margin: ".8rem 2rem 0 0" }}
                label="Precio"
                onChange={handleChangeFormat}
                name="price"
                id="price"
                onBlur={handleBlurPrice}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">€</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                style={{ margin: "1rem 2rem 0 0" }}
              >
                <RadioGroup
                  row
                  name="unit"
                  value={newProduct.unit}
                  onChange={handleRadio}
                >
                  <FormControlLabel
                    value="Kg"
                    control={<Radio color="primary" />}
                    label="Por kg"
                  />
                  <FormControlLabel
                    value="Ud."
                    control={<Radio color="primary" />}
                    label="Por unidad"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                value={newProduct.stock}
                id="stock"
                onChange={handleChangeFormat}
                name="stock"
                label="Cantidad"
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  endAdornment: (
                    <InputAdornment position="end">
                      {newProduct.unit}
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                style={{ margin: "1rem .8rem", padding: ".2rem 1.2rem" }}
                type="submit"
                variant="outlined"
                color="primary"
                value="Submit"
              >
                {!edit ? "Añadir" : "Actualizar"}
              </Button>
              <Button
                style={{ margin: "1rem 0", padding: ".2rem .3rem" }}
                variant="outlined"
                value="Submit"
                onClick={clearForm}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
        {isAdding ? (
          <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
        ) : null}
        {error.category ? (
          <div className="invalidForm">{msg.category}</div>
        ) : null}
        {msgAdd !== "" ? (
          <div className={!failAdd ? "validForm" : "invalidForm"}>{msgAdd}</div>
        ) : null}
      </Paper>

      {isLoading ? (
        <LinearProgress color="primary" style={{ marginBottom: "1rem" }} />
      ) : null}

      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.title} colSpan={3}>
                <Typography variant="h4" style={{ fontSize: "1.9rem" }}>
                  Existencias
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.title} colSpan={4}>
                <FormControl className={classes.textField}>
                  <InputLabel htmlFor="search">Buscar</InputLabel>
                  <Input
                    id="search"
                    onChange={(e) => handleSearch(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>{<SearchIcon />}</IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead style={{ background: "rgba(111, 162, 114, 0.534)" }}>
            <TableRow>
              <TableCell align="center" className={classes.header}>
                Editar
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Producto
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Sección
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Categoría
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Precio
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Existencias
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Unidad/Kg
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Actualizado
              </TableCell>
              <TableCell align="center" className={classes.header}>
                Eliminar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ background: "rgba(143, 115, 49, 0.253)" }}>
            {productsTable.length > 0
              ? productsTable
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center" className={classes.cell}>
                        <IconButton
                          onClick={() => handleEdit(row.id)}
                          style={{ color: "yellow" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.name}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.section}
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.price}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.stock}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.unit}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {row.date}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        <DeleteModal id={row.id} target="producto" />
                      </TableCell>
                    </TableRow>
                  ))
              : null}
          </TableBody>
          {products.length > 0 ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage="Líneas por página"
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todos", value: -1 },
                  ]}
                  colSpan={6}
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  ActionsComponent={TablePaginationActions}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </Table>
      </TableContainer>
      {products.length === 0 && isLoading === false ? (
        <div className="noUser">
          {errorGetUser != ""
            ? errorGetUser
            : "No hay resultados que coincidan con la busqueda."}
        </div>
      ) : null}
    </main>
  );
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}
