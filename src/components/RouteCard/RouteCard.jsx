import { Box, Button, Card, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./RouteCard.styles";

export const RouteCard = ({ id, title, href }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <Card className={styles.root} key={id}>
      <Box className={styles.box}>
        <Typography variant="h6">{id}. {title}</Typography>
        <Box className={styles.boxButton}>
          <Button
            variant="contained"
            size="medium" key={`button${id}`} className={styles.button} onClick={() => navigate(href)}>Перейти
          </Button>
        </Box>
      </Box>
    </Card>
  );
};