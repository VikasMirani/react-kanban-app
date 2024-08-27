import React from 'react';

import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

import Cards from '../Cards/Cards';

import './ListStyle.css';

const List = (props) => {
  const { listData, ticketsData, groupValue } = { ...props };

  const ListItem = (props) => {
    const { data } = {...props};
    return (
      <>
        <li className="drag-column">
          <span className="header">
            {data.name} <span className="item-count">{getCount(data)}</span>
            <span className='item-r-icons'><FaPlus /> <BsThreeDots /></span>
          </span>
          <div className="content">
            <ul className="item-list">{renderCards(data)}</ul>
          </div>
        </li>
      </>
    );
  };

  const getFilteredList = (data) => {
    let list = [];
    switch (groupValue) {
      case "status":
        list = ticketsData.filter((crd) => crd.status === data.name);
        break;
      case "priority":
        list = ticketsData.filter((crd) => crd.priority === data.id);
        break;
      case "users":
        list = ticketsData.filter((crd) => crd.userId === data.id);
        break;
      default:
        break;
    }
    return list;
  }

  const getCount = (data) => {
    let list = getFilteredList(data);
    return list.length;
  };

  const renderCards = (data) => {
    const list = getFilteredList(data);
    return (
      <>
        {list.map((crd) => {
          return <Cards key={crd.title} data={crd} />;
        })}
      </>
    );
  };

  return (
    <div className="kanban-list">
      <ul className="drag-list">
        {listData && listData.length
          ? listData.map((el) => {
              return <ListItem key={el.name} data={el} />;
            })
          : ""}
      </ul>
    </div>
  );
}

export default List;
