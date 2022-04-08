import { useNavigate } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import { Box, Button, Card, CardContent, Stack, SxProps, TextField, Theme, Typography } from "@mui/material";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const classes: SxProps<Theme> | any = {
    root: { display: "flex", justifyContent: "center" },
  };

  const showFormV2 = ({ handleSubmit, handleChange, isSubmitting, values }: FormikProps<any>) => {
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
          <Button onClick={() => navigate("/register")} type="button" fullWidth variant="outlined">
            Register
          </Button>
          <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
            Login
          </Button>
        </Stack>
      </form>
    );
  };

  return (
    <>
      <Box sx={classes.root}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Login
            </Typography>
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values));
                setSubmitting(false);
              }}
              initialValues={{ username: "", password: "" }}
            >
              {(props) => showFormV2(props)}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
