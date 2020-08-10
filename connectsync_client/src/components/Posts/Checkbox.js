import React from "react";

const Checkbox = (props) => {
  const { id, name, isChecked, handleCheckBox } = props;
  return (
    <li className="list-group-item ">
      <div className="input-group-text">
        <input
          key={id}
          name={name}
          type="checkbox"
          checked={isChecked}
          onClick={handleCheckBox}
          className="pl-4"
        />
        {name}
      </div>
    </li>
  );
};

export default Checkbox;
