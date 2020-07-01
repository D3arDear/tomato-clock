import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    common: { black: "rgba(15, 11, 11, 1)", white: "rgba(248, 248, 248, 1)" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(255, 225, 143, 1)",
      main: "rgb(255, 124, 54)",
      dark: "rgba(255, 138, 73, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(134, 231, 217, 1)",
      main: "rgba(94, 170, 163, 1)",
      dark: "rgba(28, 126, 118, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default theme;
