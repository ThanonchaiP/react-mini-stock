import { history } from "..";
import { server, STOCK_CLEAR, STOCK_FAILED, STOCK_FETCHING, STOCK_SUCCESS } from "../Constants";
import { Product } from "../types/product.type";
import { httpClient } from "../utils/httpclient";

export const setStockFetchingToState = () => ({
  type: STOCK_FETCHING,
});

export const setStockSuccessToState = (payload: Product[]) => ({
  type: STOCK_SUCCESS,
  payload,
});

export const setStockFailedToState = () => ({
  type: STOCK_FAILED,
});

export const setStockClearToState = () => ({
  type: STOCK_CLEAR,
});

export const loadStock = () => {
  return (dispatch: any) => {
    dispatch(setStockFetchingToState());
    doGetProducts(dispatch);
  };
};

export const loadStockByKeyword = (keyword: string) => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());

    if (keyword) {
      let result = await httpClient.get<Product[]>(`${server.PRODUCT_URL}/keyword/${keyword}`);
      dispatch(setStockSuccessToState(result.data));
    } else {
      doGetProducts(dispatch);
    }
  };
};

const doGetProducts = async (dispatch: any) => {
  try {
    const result = await httpClient.get<Product[]>(server.PRODUCT_URL);
    dispatch(setStockSuccessToState(result.data));
  } catch (error) {
    dispatch(setStockFailedToState());
  }
};

export const addProduct = (formData: FormData) => {
  return async (dispatch: any) => {
    await httpClient.post(server.PRODUCT_URL, formData);
    history.back();
  };
};

export const updateProduct = (formData: FormData) => {
  return async (dispatch: any) => {
    await httpClient.put(server.PRODUCT_URL, formData);
    history.back();
  };
};

export const getProductById = (id: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(setStockFetchingToState());
      let result = await httpClient.get<Product[]>(`${server.PRODUCT_URL}/${id}`);
      dispatch(setStockSuccessToState(result.data));
    } catch (error) {
      alert(JSON.stringify(error));
      dispatch(setStockFailedToState());
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setStockFetchingToState());
    await httpClient.delete(`${server.PRODUCT_URL}/${id}`);
    await doGetProducts(dispatch);
  };
};