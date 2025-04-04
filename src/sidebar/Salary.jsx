import React from "react";
import Button from "./Button";
import InputField from "../Component/InputField";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
      <div>
        <Button onClickHandler={handleClick} value="" title="Hourly" />
        <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
      </div>
      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        <InputField
          handleChange={handleChange}
          value={30}
          title="<30,000"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={50}
          title="<50,000"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={80}
          title="<80,000"
          name="test2"
        />
        <InputField
          handleChange={handleChange}
          value={100}
          title="<100,000"
          name="test2"
        />
      </div>
    </div>
  );
};

export default Salary;
