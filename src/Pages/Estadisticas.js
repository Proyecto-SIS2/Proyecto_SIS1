import React, { useMemo, useEffect, useState } from "react";
import Select from "react-select";
import Service from "../Service";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const chart_options = [
  { value: 1, label: "Facturas generadas por tiempo" },
  {
    value: 2,
    label: "Productos vendidos por tiempo",
  },
];

const date_options = [
  { value: 1, label: "Mes" },
  { value: 2, label: "Año" },
];

const month_options = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const useStyles = makeStyles((theme) => ({
  fieldSelect: {
    color: theme.palette.text.light,
    fontSize: "1.6rem",
    "& label": {
      color: theme.palette.text.light,
      fontSize: "1.6rem",
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
    width: "300px",
    "& input": {
      fontSize: "1.6rem",
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    textTransform: "capitalize",
    fontWeight: "600",
    color: theme.palette.text.light,
    fontSize: "2rem",
  },
}));

export const Estadisticas = () => {
  const classes = useStyles();
  const [dataLabel, setDataLabel] = useState([]);
  const [dataValue, setDataValue] = useState([]);
  const [chartToRender, setChartToRender] = useState(null);
  const [dateOptionSelected, setDateOptionSelected] = useState(null);
  const [monthSelected, setMonthSelected] = useState(null);
  const [yearSelected, setYearSelected] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoadingLabel, setIsLoadingLabel] = useState(true);
  const [isLoadingValue, setIsLoadingValue] = useState(true);
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const [pieChartTitle, setPieChartTitle] = useState("");

  const idu = localStorage.getItem("id");

  const handleChangeChart = (e) => {
    setChartToRender(e.value);
  };

  const handleChangeDate = (e) => {
    setDateOptionSelected(e.value);
  };

  const handleChangeMonth = (e) => {
    setMonthSelected(e.value);
  };

  const handleChangeYear = (e) => {
    setYearSelected(e.value);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    if (chartToRender === 1) {
      if (dateOptionSelected === 1) {
        Service.postData("facturas/get_facturas_by_date", {
          fecha: monthSelected,
        }).then((res) => {
          setDataLabel(res);
        });
      } else if (dateOptionSelected === 2) {
        Service.postData("facturas/get_facturas_by_year_month", {
          fecha: yearSelected,
        }).then((res) => {
          setDataLabel(months);
          setDataValue(res);
        });
      }
    } else if (chartToRender === 2) {
      if (dateOptionSelected === 1) {
        const date = new Date();
        date.setMonth(monthSelected - 1);
        setPieChartTitle(
          date
            .toLocaleString("es-MX", { month: "long" })
            .charAt(0)
            .toUpperCase() +
            date.toLocaleString("es-MX", { month: "long" }).slice(1)
        );
        const params = {
          fecha: monthSelected,
          id: idu,
        };
        Service.postData("productos/get_productos_by_date-month", params).then(
          (res) => {
            setDataLabel(res);
            setDataValue(res);
          }
        );
      } else if (dateOptionSelected === 2) {
        setPieChartTitle(yearSelected);
        const params = {
          fecha: yearSelected,
          id: idu,
        };
        Service.postData("productos/get_productos_by_date-year", params).then(
          (res) => {
            setDataLabel(res);
            setDataValue(res);
          }
        );
      }
    }
  };

  /*  useEffect(() => {
    setHasSubmitted(false);
    setValues([]);
    setLabels([]);
  }, [yearSelected]); */

  useEffect(() => {
    Service.postData("facturas/get_facturas_by_year").then((res) => {
      setYearOptions(res);
    });
  }, []);

  useEffect(() => {
    if (chartToRender === 1) {
      if (dateOptionSelected === 1) {
        Object.values(dataLabel).map((item) => {
          labels.push(item);
          setIsLoadingLabel(false);
        });
        const params = {
          week_1: labels[0],
          week_2: labels[1],
          week_3: labels[2],
          week_4: labels[3],
          week_5: labels[4],
        };
        Service.postData("facturas/get_facturas_by_date_week", params).then(
          (res) => {
            setDataValue(res);
          }
        );
      } else if (dateOptionSelected === 2) {
        dataLabel.map((item) => {
          labels.push(item);
          setIsLoadingLabel(false);
        });
      }
    } else if (chartToRender === 2) {
      Object.values(dataLabel).map((item) => {
        labels.push(item.descripcion);
        setIsLoadingLabel(false);
      });
    }
  }, [dataLabel]);

  useEffect(() => {
    if (chartToRender === 1) {
      if (dateOptionSelected === 1) {
        Object.values(dataValue).map((item) => {
          values.push(item[0].total);
          setIsLoadingValue(false);
        });
      } else if (dateOptionSelected === 2) {
        dataValue.map((item) => {
          values.push(item[0].total);
          setIsLoadingValue(false);
        });
      }
    } else if (chartToRender === 2) {
      Object.values(dataValue).map((item) => {
        values.push(item.total);
        setIsLoadingValue(false);
      });
    }
  }, [dataValue]);

  const data = useMemo(() => {
    return {
      datasets: [
        {
          legend: {
            display: false,
          },
          label: `Resultado`,
          data: values,
          borderColor: ["#1AC9E6"],
          pointRadius: 6,
          pointBackgroundColor: ["#1AC9E6", "#fff"],
          backgroundColor: [
            "#1AC9E633",
            "#1ae63733",
            "#e6371a33",
            "#e69d1a33",
            "#1a63e633",
          ],
        },
      ],
      labels,
    };
  }, [dataLabel]);

  const options = {
    maintainAspectRatio: false,
    fill: true,
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <>
      <p>{dataLabel?.[0]?.fecha}</p>
      <div className={classes.mainContainer}>
        <h1>Estadisticas</h1>
        {/* <h2>{dataLabel.length ? dataLabel[0]["Label(*)"] : "Cargando"}</h2> */}
        <Select
          className={classes.fieldSelect}
          options={chart_options}
          placeholder="Seleccione una gráfica"
          onChange={(e) => handleChangeChart(e)}
          defaultValue={chart_options[chartToRender - 1]}
        />
      </div>
      {chartToRender && (
        <>
          <div className={`${classes.mainContainer}`}>
            <Select
              className={`${classes.fieldSelect}`}
              options={date_options}
              placeholder="Seleccione una escala de tiempo"
              onChange={(e) => handleChangeDate(e)}
              defaultValue={date_options[dateOptionSelected - 1]}
            />
            {dateOptionSelected === 1 && (
              <Select
                className={`${classes.fieldSelect}`}
                options={month_options}
                placeholder="Seleccione un mes"
                onChange={(e) => handleChangeMonth(e)}
                defaultValue={month_options[monthSelected - 1]}
              />
            )}
            {dateOptionSelected === 2 && (
              <Select
                className={`${classes.fieldSelect}`}
                options={yearOptions}
                placeholder="Seleccione un año"
                onChange={(e) => handleChangeYear(e)}
                defaultValue={yearOptions[yearSelected - 1]}
              />
            )}

            {yearSelected || monthSelected ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={hasSubmitted}
                onClick={handleSubmit}
              >
                Generar gráfica
              </Button>
            ) : null}
          </div>

          {hasSubmitted &&
            !isLoadingLabel &&
            !isLoadingValue &&
            (chartToRender === 1 && dateOptionSelected === 1 ? (
              <>
                <Line data={data} options={options} />
              </>
            ) : chartToRender === 1 && dateOptionSelected === 2 ? (
              <>
                <Bar data={data} options={options} />
              </>
            ) : chartToRender === 2 ? (
              <>
                <div className={classes.mainContainer}>
                  <h2>{pieChartTitle}</h2>
                </div>
                <Pie data={data} options={options} />
              </>
            ) : null)}
        </>
      )}
    </>
  );
};
