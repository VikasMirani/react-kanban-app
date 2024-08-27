import React, { useState } from "react";

import { VscSettings } from "react-icons/vsc";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import './FilterStyle.css';

const Filter = (props) => {
  const { groupValue } = {...props}
  const [showDropdown, setShowDropDown] = useState(false);
  const handleFilterClick = () => {
    setShowDropDown((showDrop) => !showDrop);
  }

  const handleGrouping = (e) => {
    const val = e.target.value;
    props.handleGroupChange(val);
  }

  const handleOrdering = (e) => {
    const val = e.target.value;
    props.handleSortChange(val);
  }

  return (
    <div className="kanban-filter">
      <button onClick={handleFilterClick} className="filterBtn">
        <VscSettings /> <span className="filTxt">Display</span>
        {showDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {showDropdown ? (
        <div id="myDropdown" className="dropdown-content">
          <div className="drop-div">
            Grouping
            <select
              value={groupValue}
              className="filterSel"
              name="group"
              onChange={handleGrouping}
            >
              <option value="status">Status</option>
              <option value="users">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="drop-div">
            Ordering
            <select
              className="filterSel"
              name="order"
              onChange={handleOrdering}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Filter;