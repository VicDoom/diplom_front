import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@material-ui/icons";
import { useGetTasksResultQuery } from "../../api/api";
import { TaskResultBox } from "../TaskResultBox";
import { useStyles } from "./StudentBox.styles";

export const StudentBox = ({ id, name }) => {
  const styles = useStyles();
  const { data, isSuccess } = useGetTasksResultQuery({ userId: id });
  return (
    isSuccess && (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          { name }
        </AccordionSummary>
        <AccordionDetails>
          { data.data.length === 0 ? "Нет решенных заданий" : (
            data.data.map((taskResult) => <TaskResultBox taskResult={taskResult}></TaskResultBox>)
          )}
        </AccordionDetails>
      </Accordion>
    )
  );
};