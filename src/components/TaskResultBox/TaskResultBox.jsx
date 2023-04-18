import { Box, Card, Typography } from "@material-ui/core";
import { DoneOutline, ErrorOutline } from "@material-ui/icons";
import { Tooltip } from "@mui/material";
import { useStyles } from "./TaskResultBox.styles";

export const TaskResultBox = ({ taskResult }) => {
  const styles = useStyles();
  const { taskId, difficulty, isRight, date } = taskResult;
  return (
    <Card className={styles.card}>
      <Box className={styles.box}>
        <Typography variant="body1">Тип задания: {taskId}</Typography>
        <Typography variant="body1">Сложность: {difficulty}</Typography>
        <Typography variant="body1">Дата выполнения: {date}</Typography>
        { isRight ?
          (<Tooltip title="Правильно решенное задание">
            <DoneOutline htmlColor="#008000" />
          </Tooltip>) :
          (<Tooltip title="Неправильно решенное задание">
            <ErrorOutline color="error" />
          </Tooltip>)
        }
      </Box>
    </Card>
  );
};