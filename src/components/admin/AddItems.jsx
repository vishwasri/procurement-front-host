import React, { useState } from "react";
import addItem from "../../services/addItem";

function AddItems() {
  const initialItem = {
    code: "",
    name: "",
    unit: "",
    qty: 0,
    reorderL: "",
  };
  const [item, setitem] = useState(initialItem);
  const [error, seterror] = useState("");
  const units = ["Choose Unit", "Bags", "Cubes", "Numbers", "Litres", "Pieces"];
  const [allowSubmit] = useState(true);

  const onchange = (e) => {
    setitem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };
  const onchangeSelectUnit = (e) => {
    setitem({
      ...item,
      unit: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (/[0-9]/.test(item.code)) {
      const success = await addItem(item);
      if (success) setitem(initialItem);
      seterror("");
    } else {
      seterror("Invalid Item Code");
    }
  };

  return (
    <div>
      <h6
        className="pl-5 pt-1 pb-1 mb-5 mt-4"
        style={{ backgroundColor: "gray" }}
      >
        Add Item
      </h6>
      <form className="container mt-5" autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="code" className="col-5">
                  Item Code
                </label>
                <input
                  onChange={onchange}
                  value={item.code}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="code"
                  name="code"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="name" className="col-5">
                  Name
                </label>
                <input
                  onChange={onchange}
                  value={item.name}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="unit" className="col-5">
                  Unit
                </label>
                <select
                  onChange={onchangeSelectUnit}
                  value={item.unit}
                  id="unit"
                  name="unit"
                  className="form-control col-11 ml-3"
                  required
                >
                  {units.map((option) => {
                    return (
                      <option
                        key={option}
                        value={option}
                        style={{ textAlign: "center" }}
                      >
                        {option}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group col-6">
                <label htmlFor="reorderL" className="col-5">
                  Reorder Level
                </label>
                <input
                  onChange={onchange}
                  value={item.reorderL}
                  className="form-control col-10"
                  type="number"
                  id="reorderL"
                  name="reorderL"
                />
              </div>
              <p className="text-center" style={{ color: "red" }}>
                {error}
              </p>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    onClick={submit}
                    type="submit"
                    className="btn btn-success"
                    disabled={!allowSubmit}
                  >
                    Add
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddItems;