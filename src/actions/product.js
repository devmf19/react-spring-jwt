import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import ProductService from "../services/product.service";
  
  export const register = (name, price) => (dispatch) => {
    return ProductService.register(name, price).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
 
  