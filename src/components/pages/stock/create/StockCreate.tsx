import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { Product } from "../../../../types/product.type";
import * as stockActions from "../../../../actions/stock.action";
import StockForm from "../form/Form";

type Props = {};

const StockCreate = (props: Props) => {
  const dispatch = useDispatch();

  const onSubmit = (values: Product, { setSubmitting }: any) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    formData.append("image", values.file);
    dispatch(stockActions.addProduct(formData));
    setSubmitting(false);
  };

  return (
    <Box>
      <StockForm onSubmit={onSubmit} />
    </Box>
  );
};

export default StockCreate;
