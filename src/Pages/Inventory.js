import React, { useState } from "react";
import CreateProduct from "../Components/CreateProduct";
import ReadProduct from "../Components/ReadProduct";

//* Para eliminar
function createData(id, quantity, price, description) {
  return { id, quantity, price, description };
}

//* Para eliminar
let rows = [
  createData(1, 10, 14.59, "a"),
  createData(2, 5, 7.5, "b"),
  createData(3, 7, 2.5, "c"),
  createData(4, 2, 20, "d"),
  createData(5, 20, 10.12, "e"),
];

const Inventory = () => {
  const [productsData, setProductsData] = useState(rows); //* Modificar el valor inicial del estado
  const [dataToUpdate, setDataToUpdate] = useState(null);

  const createData = (data) => {
    data.id = Date.now();
    setProductsData([...productsData, data]);
  };

  const addOneByOne = (id) => {
    const index = rows.findIndex((elem) => elem.id === id);
    let tRows = [...rows];
    tRows[index] = { ...tRows[index], quantity: tRows[index].quantity + 1 };
    rows = tRows;
    setProductsData(rows);
  };

  const updateData = (data) => {
    let newProductsData = rows.map((elem) =>
      elem.id === data.id ? data : elem
    );
    setProductsData(newProductsData);
  };

  const deleteData = (id) => {
    const index = rows.findIndex((elem) => elem.id === id);
    let tRows = [...rows];
    tRows[index] = { ...tRows[index], quantity: tRows[index].quantity - 1 };
    rows = tRows;
    setProductsData(rows);
  };

  return (
    <>
      <ReadProduct
        productsData={productsData}
        deleteData={deleteData}
        setDataToUpdate={setDataToUpdate}
        addOneByOne={addOneByOne}
      />
      <CreateProduct
        createData={createData}
        updateData={updateData}
        dataToUpdate={dataToUpdate}
        setDataToUpdate={setDataToUpdate}
      />
    </>
  );
};

export default Inventory;
