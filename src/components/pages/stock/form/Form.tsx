import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { FormikProps, Form, Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { Product } from "../../../../types/product.type";
import { RootReducers } from "../../../../reducers";
import { imageUrl } from "../../../../Constants";

type Props = {
  onSubmit: (values: Product, { setSubmitting }: any) => void;
  isEditor?: boolean;
};

const StockSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  stock: Yup.number().required("Required").min(10, "Min stock is not lower than 10"),
  price: Yup.number().required("Required").min(100, "Min price is not lower than 100"),
});

const StockForm = ({ onSubmit, isEditor = false }: Props) => {
  const stockEditReducer = useSelector((state: RootReducers) => state.stockEditReducer);
  const initialValues: Product = { name: "", stock: "", price: "" };

  const uploadFile = (e: React.ChangeEvent<any>, setFieldValue: any) => {
    e.preventDefault();
    setFieldValue("file", e.target.files[0]); // for upload
    setFieldValue("file_obj", URL.createObjectURL(e.target.files[0])); // for preview image
  };

  const showPreviewImage = (values: Product) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 150 }} alt="" />;
    } else if (values.image) {
      return <img src={`${imageUrl}/images/${values.image}`} style={{ height: 150 }} alt="" />;
    }
  };

  const initForm = ({ values, setFieldValue, isSubmitting }: FormikProps<Product>) => {
    return (
      <Form>
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Typography gutterBottom variant="h3">
              {isEditor ? "Edit Stock" : "Create Stock"}
            </Typography>

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="name" type="text" label="Name" />
            <br />
            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="price" type="number" label="Price" />

            <Field style={{ marginTop: 16 }} fullWidth component={TextField} name="stock" type="number" label="Stock" />

            <div style={{ margin: 16 }}>{showPreviewImage(values)}</div>

            <div>
              <img src={`${process.env.PUBLIC_URL}/images/ic_photo.png`} alt="" style={{ width: 25, height: 20 }} />
              <span style={{ color: "#00B0CD", marginLeft: 10 }}>Add Picture</span>

              <input
                type="file"
                onChange={(e) => uploadFile(e, setFieldValue)}
                name="image"
                click-type="type1"
                multiple
                accept="image/*"
                id="files"
                style={{ padding: "20px 0 0 20px" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              disabled={isSubmitting}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1 }}
            >
              {isEditor ? "Edit" : "Create"}
            </Button>
            <Button component={Link} to="/stock" variant="outlined" fullWidth>
              Cancl
            </Button>
          </CardActions>
        </Card>
      </Form>
    );
  };

  return (
    <>
      <Formik
        initialValues={isEditor && stockEditReducer.result ? stockEditReducer.result : initialValues}
        enableReinitialize
        validationSchema={StockSchema}
        onSubmit={(values, { setSubmitting }) => onSubmit(values, { setSubmitting })}
      >
        {(props) => initForm(props)}
      </Formik>
    </>
  );
};

export default StockForm;
