import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

const initData = {
  id: null,
  quantity: 1,
  price: 1,
  description: "",
};

const CreateProduct = ({
  createData,
  updateData,
  dataToUpdate,
  setDataToUpdate,
}) => {
  const [data, setData] = useState(initData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.id === null) {
      createData(data);
    } else {
      updateData(data);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setData(initData);
    setDataToUpdate(null);
  };

  useEffect(() => {
    if (dataToUpdate) {
      setData(dataToUpdate);
    } else {
      setData(initData);
    }
  }, [dataToUpdate]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item>
          <TextField
            id="quantity-input"
            name="quantity"
            label="Cantidad"
            type="number"
            InputProps={{ inputProps: { min: "1" } }}
            required
            fullWidth
            value={data.quantity}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="price-input"
            name="price"
            label="Precio"
            type="number"
            InputProps={{ inputProps: { min: "1" } }}
            required
            fullWidth
            value={data.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="description-input"
            name="description"
            label="Descripcion"
            type="text"
            required
            fullWidth
            value={data.description}
            onChange={handleChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          {dataToUpdate ? "Actualizar producto" : "Crear producto"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          type="reset"
          onClick={handleReset}
        >
          Limpiar campos
        </Button>
      </Grid>
    </form>
  );
};

export default CreateProduct;
