import { useSelector } from "react-redux";
import { Box, Typography } from "@material-ui/core";
import { PageWrapper, StudentBox, TaskResultBox } from "../../components";
import { useGetStudentsQuery, useGetTasksResultQuery, useGetUserInfoQuery } from "../../api/api";
import { useStyles } from "./UserAccount.styles";

const getRoleNames = (roles) => {
  const roleNames = {
    "USER": "Пользователь",
    "ADMIN": "Администратор",
    "STUDENT": "Ученик",
    "TEACHER": "Преподаватель",
  };
  return roles.map(role => roleNames[role]).join(", ");
};

export const UserAccount = () => {
  const styles = useStyles();
  const userId = useSelector(state => state.auth.id);
  const { isSuccess, data } = useGetUserInfoQuery({ id: userId });
  const { data: tasksResultData, isSuccess: isSuccessTaskResult } = useGetTasksResultQuery({ userId });
  const getStudentsQuery = useGetStudentsQuery({});
  console.log(getStudentsQuery);
  return isSuccess && (
    <PageWrapper>
      <Box className={styles.box}>
        <Typography variant="h5">Кабинет пользователя</Typography>
        <Typography variant="h6">Имя: {data.data.username}</Typography>
        <Typography variant="h6">Статус: {getRoleNames(data.data.roles)}</Typography>
        {isSuccessTaskResult && (
          <>
            <Box className={styles.resultBox}>
              <Typography variant="h5">Результаты Ваших заданий</Typography>
              {
                tasksResultData.data.length === 0
                  ? "Результаты отсутствуют"
                  : tasksResultData.data.map((taskResult) => <TaskResultBox taskResult={taskResult}></TaskResultBox>)
              }
            </Box>
            <Box className={styles.resultBox}>
              {getStudentsQuery.isSuccess && (
                <>
                  <Typography variant="h5">Результаты учеников</Typography>
                  {
                    getStudentsQuery.data.content.map(
                      (student) => <StudentBox id={student._id} name={student.username}/>
                    )
                  }
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </PageWrapper>
  );
};