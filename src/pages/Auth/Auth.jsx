import { Box, Button, Card, CardContent, Link, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { PageWrapper, Snackbar } from "../../components";
import { useAuthLoginMutation } from "../../api/api";
import { useStyles } from "./Auth.styles";

export const Auth = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [authLogin, result] = useAuthLoginMutation();
  const token = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const successAuthHandler = useCallback(debounce(() => navigate("/user-account"), 500), []);
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await authLogin({ username: values.login, password: values.password });
      if (response.data) {
        dispatch({ type: "setAuthToken", payload: { token: response.data.token, id: response.data.id } });
      }
      console.log(response);
      if (!response.error) {
        setMessage("Пользователь успешно авторизирован");
        setOpenSnackbar(true);
        successAuthHandler();
      } else {
        setMessage(response.error.data.message);
        setOpenSnackbar(true);
      }
    },
  });
  return (
    <PageWrapper>
      <Box className={styles.root}>
        <Card>
          <CardContent className={styles.card}>
            <Box className={styles.box} component="form" onSubmit={formik.handleSubmit}>
              <Typography variant="h6">Авторизация</Typography>
              <TextField
                label="Логин"
                id="login"
                name="login"
                value={formik.values.login}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Пароль"
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                  Войти
              </Button>
              <Typography align="center">
                Если у Вас нет аккаунта, <Link href={"/registration"}>зарегистрируйтесь</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} text={message} status={result.status} />
    </PageWrapper>
  );
};