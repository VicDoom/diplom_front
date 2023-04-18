import { initialState } from "./state";

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case "setAuthToken": {
    localStorage.setItem("token", action.payload.token);
    localStorage.setItem("id", action.payload.id);
    return { ...state, token: action.payload.token };
  }
  case "refreshAuthToken": {
    return { ...state, token: localStorage.getItem("token"), id: localStorage.getItem("id") };
  }
  case "deleteAuthToken": {
    return { ...state, token: undefined, id: undefined };
  }
  default: {
    return state;
  }
  }
};