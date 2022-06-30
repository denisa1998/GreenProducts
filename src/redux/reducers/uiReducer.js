import { UPDATE_FCATEGORIES, UPDATE_VCATEGORIES } from "../types";

const initialState = {
  fCategories: [
    "Fruta de temporada",
    "Fruta tropical",
    "Cítricos",
    "Frutos del bosque",
    "Sandías y melones",
  ],
  vCategories: [
    "Hortalizas",
    "Setas y hongos",
    "Hierbas aromáticas",
    "Ensaladas",
    "Patatas, ajos y cebollas",
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FCATEGORIES:
      return {
        ...state,
        fCategories: action.payload,
      };
    case UPDATE_VCATEGORIES:
      return {
        ...state,
        vCategories: action.payload,
      };
    default:
      return state;
  }
}
