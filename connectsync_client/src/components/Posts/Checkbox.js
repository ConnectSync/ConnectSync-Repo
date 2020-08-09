import React from "react";

const Checkbox = (props) => {
  const { id, name, isChecked, handleCheckBox } = props;
  console.log("cHeck box ",props)
  console.log("CHECK ", isChecked);
  return (
    <li className="list-group-item ">
      <div class="input-group-text">
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
