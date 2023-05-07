import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { LatexBox, PageWrapper } from "../../components";
import { useGetTheoryQuery } from "../../api/api";
import { useStyles } from "./Theory.styles";

export const Theory = () => {
  const styles = useStyles();
  const { id } = useParams();
  const { data, isSuccess } = useGetTheoryQuery({ id });
  const theoryBlocks = isSuccess && data.success ? data.content[0].body.split("\\n") : "";
  return (
    <PageWrapper>
      { isSuccess && data.success && (
        <>
          <Typography variant="h5">Теоретическая справка к заданию {data.content[0].taskId}</Typography>
          <Typography variant="h5" className={styles.title}>"{data.content[0].title}"</Typography>
          { theoryBlocks.map((block) => <div className={styles.latexBox}><LatexBox text={block} /></div>) }
        </>
      ) }
    </PageWrapper>
  );
};