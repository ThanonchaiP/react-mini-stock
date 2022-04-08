import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";
import { httpClient } from "../../../utils/httpclient";
import { User } from "../../../types/user.type";
import { server } from "../../../Constants";

type Props = {};

const RegisterPage = (props: Props) => {
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
  };

  // const showFormV1 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<any>) => {
  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <label>Username: </label>
  //       <input type="text" name="username" id="username" onChange={handleChange} value={values.username} />
  //       <br />
  //       <label>Password: </label>
  //       <input type="text" name="password" id="password" onChange={handleChange} value={values.password} />
  //       <br />

  //       <button type="submit" disabled={isSubmitting}>
  //         Submit
  //       </button>
  //       <button onClick={() => navigate("/login", { replace: true })}>Back</button>
  //     </form>
  //   );
  // };

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
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
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
            <Formik
              onSubmit={async (values, { setSubmitting }) => {
                const result = await httpClient.post(server.REGISTER_URL, values);
                alert(JSON.stringify(result.data));
                setSubmitting(false);
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
