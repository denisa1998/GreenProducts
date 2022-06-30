import {
  LOADING_PRODUCTS,
  SET_PRODUCTS,
  FAIL_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  FAIL_ADD_PRODUCT,
  UPDATING_PRODUCT,
  PRODUCT_UPDATED,
  FAIL_UPDATE_PRODUCT,
  DELETING_PRODUCT,
  PRODUCT_DELETED,
  FAIL_DELETE_PRODUCT,
  CLEAR_PRODUCT,
  FILL_CHECK_PRODUCTS,
  REGISTERING,
  CHECKOUT_REGISTERED,
  FAIL_CHECKOUT,
  CLEAR_CHECKOUT,
  LOADING_REGISTERS,
  SET_REGISTERS,
  FAIL_REGISTERS,
} from "../types";

const initialState = {
  isLoading: false,
  products: [],
  error: "",
  isAdding: false,
  msgAdd: "",
  failAdd: false,
  isDeleting: false,
  msgDelete: "",
  deleted: false,
  checkProducts: [],
  isRegistering: false,
  checkoutRegistered: "",
  failCheckout: false,
  loadingRegisters: false,
  setRegisters: [],
  failRegisters: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADDING_PRODUCT:
      return {
        ...state,
        isAdding: true,
        failAdd: false,
      };
    case PRODUCT_ADDED:
      return {
        ...state,
        isAdding: false,
        failAdd: false,
        msgAdd: action.payload,
      };
    case FAIL_ADD_PRODUCT:
      return {
        ...state,
        isAdding: false,
        failAdd: true,
        msgAdd: action.payload,
      };
    case DELETING_PRODUCT:
      return {
        ...state,
        deleted: false,
        isDeleting: true,
      };
    case PRODUCT_DELETED:
      return {
        ...state,
        isDeleting: false,
        deleted: true,
        msgDelete: action.payload,
      };
    case FAIL_PRODUCTS:
      return {
        ...state,
        isDeleting: false,
        msgDelete: action.payload,
        deleted: false,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        msgAdd: "",
        deleted: false,
        msgDelete: "",
      };
    case FILL_CHECK_PRODUCTS:
      state.checkProducts.push(action.payload);
      return {
        ...state,
      };
    case REGISTERING:
      return {
        ...state,
        failCheckout: false,
        isRegistering: true,
      };
    case CHECKOUT_REGISTERED:
      return {
        ...state,
        failCheckout: false,
        isRegistering: false,
        checkoutRegistered: action.payload,
      };
    case FAIL_CHECKOUT:
      return {
        ...state,
        failCheckout: true,
        isRegistering: false,
        checkoutRegistered: action.payload,
      };
    case CLEAR_CHECKOUT:
      return {
        ...state,
        checkoutRegistered: "",
        checkProducts: [],
      };
    case LOADING_REGISTERS:
      return {
        ...state,
        loadingRegisters: true,
        failRegisters: "",
        setRegisters: [],
      };
    case SET_REGISTERS:
      return {
        ...state,
        loadingRegisters: false,
        failRegisters: "",
        setRegisters: action.payload,
      };
    case FAIL_REGISTERS:
      console.log("failRegisters");
      return {
        ...state,
        loadingRegisters: false,
        failRegisters: action.payload,
        setRegisters: [],
      };
    default:
      return state;
  }
}
