import { Box, Button, TextField, Typography } from "@material-ui/core";
import { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { LatexBox, PageWrapper, Snackbar } from "../../components";
import { useGetTaskQuery, usePostTaskResultMutation } from "../../api/api";
import { useStyles } from "./Task.styles";

export const Task = () => {
  const styles = useStyles();
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const [value, setValue] = useState("");
  const [result, setResult] = useState({ message: "", status: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const getTaskQuery = useGetTaskQuery({ id });
  const [postTaskResultMutation] = usePostTaskResultMutation({});
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(false);

  const getNewTask = () => {
    getTaskQuery.refetch();
    setValue("");
    setResult({ message: "", status: "" });
    setIsConfirmButtonDisabled(false);
  };
  const checkAnswer = async () => {
    const rightAnswers = getTaskQuery.data.content.answer.split(" ");
    const checkCallback = (value, checkValue) => {
      if (isNaN(Number(checkValue))) {
        return value === checkValue;
      }
      return Number(value) === Number(checkValue);
    };
    const isRight = value.trim().split(" ").every((value, index) => checkCallback(value, rightAnswers[index]));
    const timeOptions = { hour12: false, hour: "numeric", minute: "numeric" };
    const date = `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString("en-US", timeOptions)}`;
    const response = await postTaskResultMutation({ taskId: id, userId, isRight, date });
    setResult(isRight && response.data.success
      ? { message: "Верно!", status: "fulfilled" }
      : { message: response.data.success ? "Ошибка!" : response.data.message, status: "error" }
    );
    setOpenSnackbar(true);
    setIsConfirmButtonDisabled(isRight && response.data.success);
  };
  return getTaskQuery.isSuccess && (
    <PageWrapper>
      <Box className={styles.root}>
        <Typography variant="h6">Задание {getTaskQuery.data.content.id}</Typography>
        <LatexBox text={getTaskQuery.data.content.title} />
        <LatexBox text={getTaskQuery.data.content.taskBody} />
        <Box className={styles.controls}>
          <TextField
            size="small"
            label="Введите ответ"
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={checkAnswer}
            disabled={isConfirmButtonDisabled}
          >
              Проверить
          </Button>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={!isConfirmButtonDisabled}
          onClick={getNewTask}
        >
          Получить новое задание
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        text={result.message}
        status={result.status}
      />
    </PageWrapper>
  );
};