import {
  LOADING_PRODUCTS,
  SET_PRODUCTS,
  FAIL_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  FAIL_ADD_PRODUCT,
  DELETING_PRODUCT,
  PRODUCT_DELETED,
  FAIL_DELETE_PRODUCT,
  REGISTERING,
  CHECKOUT_REGISTERED,
  FAIL_CHECKOUT,
  LOADING_REGISTERS,
  SET_REGISTERS,
  FAIL_REGISTERS,
  CLEAR_PRODUCT,
} from "../types";
import axios from "axios";

let proxy = "https://europe-west1-greenproducts-2e471.cloudfunctions.net/api";

// Obtener todos los productos
export const getProducts = () => (dispatch) => {
  console.log("get");
  dispatch({ type: LOADING_PRODUCTS });
  return axios
    .get(`${proxy}/mercado`)
    .then((res) => {
      dispatch({ type: SET_PRODUCTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_PRODUCTS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};

// Añadir un producto
export const addNewProduct = (data) => (dispatch) => {
  dispatch({ type: ADDING_PRODUCT });
  return axios
    .post(`${proxy}/mercado`, data)
    .then((res) => {
      dispatch({ type: PRODUCT_ADDED, payload: res.data.msg });
      setTimeout(() => {
        dispatch(getProducts());
        dispatch({ type: CLEAR_PRODUCT });
      }, 2000);
    })
    .catch(() => {
      dispatch({
        type: FAIL_ADD_PRODUCT,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Actualizar un producto
export const updateProduct = (id, data) => (dispatch) => {
  dispatch({ type: ADDING_PRODUCT });
  return axios
    .post(`${proxy}/updateProduct/${id}`, data)
    .then((res) => {
      dispatch({ type: PRODUCT_ADDED, payload: res.data.msg });
      setTimeout(() => {
        dispatch(getProducts());
        dispatch({ type: CLEAR_PRODUCT });
      }, 2000);
    })
    .catch((err) => {
      dispatch({
        type: FAIL_ADD_PRODUCT,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Borrar un producto
export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: DELETING_PRODUCT });
  return axios
    .post(`${proxy}/deleteProduct/${id}`)
    .then((res) => {
      dispatch({ type: PRODUCT_DELETED, payload: res.data.message });
      setTimeout(() => {
        dispatch(getProducts());
      }, 2000);
    })
    .catch((err) => {
      dispatch({
        type: FAIL_DELETE_PRODUCT,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Registrar una compra
export const checkout = (data) => (dispatch) => {
  dispatch({ type: REGISTERING });
  return axios
    .post(`${proxy}/checkout/`, data)
    .then((res) => {
      console.log(res);
      dispatch({ type: CHECKOUT_REGISTERED, payload: res.data.msg });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_CHECKOUT,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Obtener los registros de compras
export const getRegisters = (id) => (dispatch) => {
  dispatch({ type: LOADING_REGISTERS });
  //Si existe un id se devuelven los registros del socio, sino todos los registros
  let url;
  if (id) url = `${proxy}/history/${id}`;
  else url = `${proxy}/history`;
  return axios
    .get(url)
    .then((res) => {
      dispatch({ type: SET_REGISTERS, payload: res.data.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_REGISTERS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
