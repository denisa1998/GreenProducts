import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_LOGOUT,
  LOADING_USER,
  LOADING_USERS,
  USERS_LOADED,
  FAIL_USERS,
  MODAL_LOADING,
  FAIL_MODAL,
  USER_ERRORS,
  USER_HELPERS,
  DELETING_USER,
  USER_DELETED,
  FAIL_DELETE,
  DATA_LOADED,
  DATA_LOADING,
  FAIL_DATA,
} from "../types";
import axios from "axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

let proxy = "https://europe-west1-greenproducts-2e471.cloudfunctions.net/api";

export const loginUser = (email, password) => (dispatch) => {
  let data = { email: email, password: password };
  dispatch({ type: LOADING_USER });
  return axios
    .post(`${proxy}/login`, data)
    .then((res) => {
      let id = res.data.token;
      if (id) {
        setAuthorizationHeader(id);
        dispatch({ type: SET_AUTHENTICATED });
        //history.push("/");
      } else {
        dispatch({
          type: SET_UNAUTHENTICATED,
          error: res.data.error,
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SET_UNAUTHENTICATED,
        error: "Error interno. Inténtelo más tarde!",
      });
    });
};
export const logoutUser = () => (dispatch) => {
  dispatch({ type: SET_LOGOUT });
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("user");
};
// Obtener los usuarios filtrados
export const getUsersData = (data) => (dispatch) => {
  dispatch({ type: LOADING_USERS });
  return axios
    .post(`${proxy}/users`, data)
    .then((res) => {
      dispatch({ type: USERS_LOADED, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: FAIL_USERS,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Obtener un usuario
export const getUserData = (id) => (dispatch) => {
  dispatch({ type: DATA_LOADING });
  return axios
    .post(`${proxy}/users/${id}`)
    .then((res) => {
      dispatch({ type: DATA_LOADED, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_DATA,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Añadir o actualizar un usuario
export const addUser = (data, user) => (dispatch) => {
  dispatch({ type: MODAL_LOADING });
  let url;
  if (user) url = `${proxy}/update/${user}`;
  else url = `${proxy}/user`;
  console.log(data);
  return axios
    .post(url, data)
    .then((res) => {
      dispatch({ type: USER_ERRORS, payload: res.data.errors });
      dispatch({ type: USER_HELPERS, payload: res.data.mensaje });
      dispatch(
        getUsersData({
          nombre: "",
          apellido: "",
          dni: "",
          nsocio: "",
        })
      );
    })
    .catch(() => {
      dispatch({
        type: FAIL_MODAL,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};
// Eliminar un usuario
export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETING_USER });
  return axios
    .post(`${proxy}/delete/${id}`)
    .then((res) => {
      dispatch({
        type: USER_DELETED,
        payload: "Usuario eliminado correctamente.",
      });
      dispatch(
        getUsersData({
          nombre: "",
          apellido: "",
          dni: "",
          nsocio: "",
        })
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: FAIL_DELETE,
        payload: "Error interno. ¡Inténtelo más tarde!",
      });
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("user", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
