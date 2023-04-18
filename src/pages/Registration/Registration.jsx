import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { PageWrapper, Snackbar } from "../../components";
import { useAuthRegisterMutation } from "../../api/api";
import { useStyles } from "./Registration.styles";

export const Registration = () => {
  const styles = useStyles();
  const [authRegister, result] = useAuthRegisterMutation({});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const successRegistrationHandler = useCallback(debounce(() => navigate("/auth"), 1000), []);
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      isTeacher: false,
      repeatPassword: "",
    },
    onSubmit: async (values) => {
      if (values.password !== values.repeatPassword) {
        setMessage("Пароли не совпадают");
        setOpenSnackbar(true);
        return;
      }
      const response =
        await authRegister(
          { username: values.login, password: values.password, role: values.isTeacher ? "TEACHER" : "STUDENT" }
        );
      if (!response.error) {
        setMessage(response.data.message);
        setOpenSnackbar(true);
        successRegistrationHandler();
      } else {
        setOpenSnackbar(true);
        setMessage(response.error.data.message);
      }
    },
  });
  return (
    <PageWrapper>
      <Box className={styles.root}>
        <Card>
          <CardContent className={styles.card}>
            <Box className={styles.box} component="form" onSubmit={formik.handleSubmit}>
              <Typography variant="h6">Регистрация</Typography>
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
              <TextField
                label="Повторите пароль"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                variant="outlined"
                size="small"
              />
              <FormControlLabel 
                control={
                  <Checkbox
                    title="Вы преподаватель?"
                    id="isTeacher"
                    name="isTeacher"
                    value={formik.values.isTeacher}
                    onChange={formik.handleChange}
                  />
                } 
                label="Вы преподаватель?" 
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Зарегистрироваться
              </Button>
              <Typography align="center">
                Уже зарегистрированы? <Link href={"/auth"}>Войдите в систему</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Snackbar open={openSnackbar} onClose={() => setOpenSnackbar(false)} text={message} status={result.status} />
    </PageWrapper>
  );
};