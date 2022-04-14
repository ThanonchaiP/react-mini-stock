import { Box } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import * as stockEditActions from "../../../../actions/stock.edit.action";
import { Product } from "../../../../types/product.type";
import StockForm from "../form/Form";

const StockEditPage: React.FC<any> = () => {
  const dispatch = useDispatch();
  const match = useMatch("/stock/edit/:id");
  let id = match?.params.id;

  React.useEffect(() => {
    dispatch(stockEditActions.getProductById(id));
  }, []);

  const onSubmit = (values: Product, { setSubmitting }: any) => {
    let formData = new FormData();
    formData.append("id", String(values.id));
    formData.append("name", values.name);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));

    if (values.file) {
      formData.append("image", values.file);
    }

    dispatch(stockEditActions.updateProduct(formData));
    setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <StockForm onSubmit={onSubmit} isEditor />
      </Box>
    </Box>
  );
};

export default StockEditPage;
