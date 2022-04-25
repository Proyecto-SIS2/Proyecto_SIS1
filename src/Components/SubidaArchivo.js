import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Factura from "./Factura";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    padding: 20,
    height: "650px",
  },
  logoImg: {
    width: "75%",
    display: "block",
    margin: "0 auto",
    padding: "20px 0",
  },
  form: {
    width: "100%",
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",

    "& > label": {
      margin: "10px 10px 0 0",
    },
  },
  loginContainer: {
    backgroundColor: theme.palette.background.default,
    boxShadow: "none",
  },
  field: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    "& label": {
      color: theme.palette.text.light,
      fontSize: "1.6rem",
      opacity: 0.8,
    },
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& fieldset legend": {
      fontSize: "1.15rem",
    },
    "&:hover fieldset": {
      borderWidth: `2px`,
    },
    "&:hover fieldset:not(.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline)":
      {
        borderColor: `${theme.palette.primary.main} !important`,
      },
  },
  fieldSelect: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    "& label": {
      color: theme.palette.text.light,
      fontSize: "1.6rem",
      opacity: 0.8,
    },
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& fieldset legend": {
      fontSize: "1.15rem",
    },
    "&:hover fieldset": {
      borderWidth: `2px`,
    },
    "&:hover fieldset:not(.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline)":
      {
        borderColor: `${theme.palette.primary.main} !important`,
      },
    margin: "10px 10px 0 0",
  },
  fieldIcon: {
    color: theme.palette.text.light,
    fontSize: "4rem",
  },
  inputField: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textTransform: "capitalize",
    fontWeight: "600",
    color: theme.palette.text.light,
    fontSize: "2rem",
  },
  textLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
    fontSize: "1.6rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  alertText: {
    color: "red",
    fontSize: "1.6rem",
    position: "relative",
    marginInlineStart: "50px",
    display: "none",
  },
}));

export default function SubidaArchivo() {
  const [file, setFile] = useState();

  const uploadFile = (event) => {
    let fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0]);
    fileReader.onload = function () {
      setFile(fileReader.result);
    };
    fileReader.onerror = function () {
      console.log(fileReader.error);
    };
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <input className={classes.submit} type="file" onChange={uploadFile} />
      {!file ? null : <Factura file={file} />}
    </Grid>
  );
}
