import React, { useState, useEffect } from "react";
import NumberFormatCustom from "../components/numberFormat";
//Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { FILL_CHECK_PRODUCTS } from "../redux/types";

export default function BuyForm() {
  const dispatch = useDispatch();

  let products = [];
  //Recogiendo los datos a mandar al servidor
  const [state, setState] = useState({
    section: "Fruta",
    category: "",
    name: "",
    unit: "kg",
    stock: "",
    price: "",
    total: 0,
  });
  const [error, setError] = useState({
    name: "",
    stock: "",
  });
  const [selected, setSelected] = useState({ name: "" });

  //Productos
  products = useSelector((state) => state.data.products);
  useEffect(() => {});

  //Categorias disponibles
  let fCategories = useSelector((state) => state.ui.fCategories);
  let vCategories = useSelector((state) => state.ui.vCategories);

  const categoriesProps = {
    options: state.section === "Fruta" ? fCategories : vCategories,
    getOptionLabel: (option) => option,
  };

  let sortedProducts = [];
  products.forEach((p) => {
    if (state.section === p.section) {
      if (state.category !== "") {
        if (state.category === p.category) sortedProducts.push(p);
      } else sortedProducts.push(p);
    }
  });

  const productoProps = {
    options: sortedProducts,
    getOptionLabel: (option) => option.name,
  };

  const handleRadio = (event) => {
    setState({
      ...state,
      section: event.target.value,
      category: "",
      name: "",
      unit: "kg",
      stock: "",
      price: "",
      total: 0,
    });
    setSelected({ name: "" });
  };
  //Añadir los cambios del input
  function handleChangeFormat(e) {
    let name = e.target.name;
    let value = e.target.value;

    setState({
      ...state,
      [name]: value,
      total: (value * state.price).toFixed(2),
    });
    setError({
      stock: "",
    });
  }
  //Añadir el producto al carrito de compra
  const addProduct = () => {
    if (state.name === "") {
      setError({
        name: "¡Selecciona un producto!",
      });
      return;
    }
    if (state.stock === "") {
      setError({
        stock: "¡Añade una cantidad!",
      });
      return;
    }
    dispatch({
      type: FILL_CHECK_PRODUCTS,
      payload: state,
    });
    setState({
      section: "Fruta",
      category: "",
      name: "",
      unit: "kg",
      stock: "",
      price: "",
      total: 0,
    });
    setSelected({ name: "" });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Productos comprados
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <FormControl component="fieldset">
            <RadioGroup
              row
              name="position"
              value={state.section}
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
          <Autocomplete
            {...categoriesProps}
            value={state.category}
            id="category"
            blurOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Categoría" margin="normal" />
            )}
            onChange={(event, newValue) => {
              setState({
                ...state,
                category: newValue,
                name: "",
                unit: "kg",
                stock: "",
                price: "",
                total: 0,
              });
              setSelected({ name: "" });
            }}
          />
          <Autocomplete
            {...productoProps}
            value={selected}
            id="products"
            blurOnSelect
            renderInput={(params) => (
              <TextField {...params} label="Producto" margin="normal" />
            )}
            onChange={(event, newValue) => {
              setError({
                name: "",
              });
              setState({
                ...state,
                category: newValue.category,
                name: newValue.name,
                unit: newValue.unit,
                price: newValue.price,
                total: newValue.price * state.stock,
              });
              setSelected(newValue);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Cantidad
          </Typography>
          <TextField
            value={state.stock}
            id="stock"
            onChange={handleChangeFormat}
            name="stock"
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: (
                <InputAdornment position="end">{state.unit}</InputAdornment>
              ),
            }}
          />
          <Typography variant="h6" style={{ marginTop: "1rem" }}>
            Precio total
          </Typography>

          <TextField
            value={state.total}
            disabled
            style={{ margin: ".8rem 2rem 0 0" }}
            id="totakl"
            InputProps={{
              inputComponent: NumberFormatCustom,
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
          />
        </Grid>
      </Grid>
      {error.name !== "" ? (
        <div className="invalidForm">{error.name}</div>
      ) : null}
      {error.stock !== "" ? (
        <div className="invalidForm">{error.stock}</div>
      ) : null}
      <div style={{ position: "absolute", right: "9rem", bottom: "1.5rem" }}>
        <Button variant="outlined" color="primary" onClick={addProduct}>
          Añadir producto
        </Button>
      </div>
    </React.Fragment>
  );
}
