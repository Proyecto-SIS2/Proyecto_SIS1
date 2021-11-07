import React, {Fragment} from 'react';
import Header from "../Components/Header";
import { makeStyles } from '@material-ui/core/styles';
import Title from "../Components/Title";
import FacturaGenerada from "../Components/FacturaGenerada";

const useStyles = makeStyles(() => ({
    leadsContainer: {
        width: "calc(100% - 240px)",
        height: "calc(100vh - 80px)",
        marginLeft: 240,
        padding: "20px",
    },
}));

export default function FacturaID( {changePage } ) {
    const classes = useStyles();

    return (
        <Fragment>
            <Header changePage={changePage}/>
            <div className={classes.leadsContainer}>
                <Title>Factura</Title>
                <FacturaGenerada/>
            </div>
        </Fragment>
    )
}