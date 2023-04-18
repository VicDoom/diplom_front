import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  grow: {
    flex: 1,
  },
  headerButtonSection: {
    display: "flex",
  },
  title: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));