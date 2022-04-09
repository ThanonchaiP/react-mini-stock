import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Alert, Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../types/user.type";
import * as RegisterAction from "../../../actions/register.action";
import { RootReducers } from "../../../reducers";

type Props = {};

const RegisterPage = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const registerReducer = useSelector((state: RootReducers) => state.registerReducer);

  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
  };

  const showFormV2 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<User>) => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          onChange={handleChange}
          value={values.username}
          autoComplete="email"
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          onChange={handleChange}
          value={values.password}
          type="password"
        />

        <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
          <Button onClick={() => navigate("/login")} type="button" fullWidth variant="outlined">
            Cancel
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={registerReducer.isFetching}>
            Create
          </Button>
        </Stack>
      </form>
    );
  };

  const initValues: User = { username: "", password: "" };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Register
            </Typography>
            {registerReducer.isError && <Alert severity="error">Register failed</Alert>}
            <Formik
              onSubmit={async (values) => {
                dispatch(RegisterAction.register(values, navigate));
              }}
              initialValues={initValues}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default RegisterPage;
