import { useStyles } from "./LatexBox.styles";

const Latex = require("react-latex");

export const LatexBox = ({ text }) => {
  const styles = useStyles();
  const formattedText = text.split(" ").join("~").split("-").join("~-~");
  return <div className={styles.root}><Latex output="html" >{String.raw`$$${formattedText}$$`}</Latex></div>;
};