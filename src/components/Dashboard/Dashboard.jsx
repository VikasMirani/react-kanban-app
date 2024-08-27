import React, { useEffect, useState } from "react";
import axios from "axios";

import Filter from "../Filter/Filter";
import List from "../List/List";

import "./DashboardStyle.css";

const Dashboard = () => {
  const StatusList = [
    { id: 1, name: "Backlog" },
    { id: 3, name: "Todo" },
    { id: 3, name: "In progress" },
    { id: 4, name: "Done" },
    { id: 5, name: "Canceled" },
  ];
  const PriorityList = [
    { id: 0, name: "No Priority" },
    { id: 4, name: "Urgent" },
    { id: 3, name: "High" },
    { id: 2, name: "Medium" },
    { id: 1, name: "Low" },
  ];
  const [data, setData] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [groupValue, setGroupValue] = useState("status");
  // eslint-disable-next-line
  const [orderValue, setOrderValue] = useState("priority");
  const [userList, setUserList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const serviceUrl =
      "https://api.quicksell.co/v1/internal/frontend-assignment";
    await axios
      .get(serviceUrl)
      .then((resp) => {
        localStorage.setItem("userList", JSON.stringify(resp.data.users));
        const isGroupValue = localStorage.getItem("groupValue");
        const currValue = isGroupValue ? isGroupValue : "status";
        setData(resp.data.tickets);
        setUserList(resp.data.users);
        createGroupList(currValue);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const isGroupValue = localStorage.getItem("groupValue");
    if (isGroupValue) {
      setGroupValue(isGroupValue);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const createOrderList = (val) => {
    let list = data;
    switch (val) {
      case "priority":
        list = list.sort((a, b) => b.priority - a.priority);
        break;
      case "title":
        list = list.sort((a, b) => a.title - b.title);
        break;
      default:
        break;
    }
    setData(list);
  };

  const createGroupList = (val) => {
    switch (val) {
      case "status":
        setDisplayList(StatusList);
        break;
      case "users":
        localStorage.setItem("displayList", JSON.stringify(userList));
        const isUserList = localStorage.getItem("userList");
        const currList = isUserList ? JSON.parse(isUserList) : userList;
        setDisplayList(currList);
        break;
      case "priority":
        setDisplayList(PriorityList);
        break;
      default:
        break;
    }
  };

  const handleGroupChange = (val) => {
    localStorage.setItem("groupValue", val);
    createGroupList(val);
    setGroupValue(val);
  };

  const handleSortChange = (val) => {
    createOrderList(val);
    setOrderValue(val);
  };

  const Spinner = () => {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  };

  return (
    <div className="kanban-dashboard">
      <Filter
        handleGroupChange={handleGroupChange}
        handleSortChange={handleSortChange}
        groupValue={groupValue}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <List
          listData={displayList}
          ticketsData={data}
          groupValue={groupValue}
        />
      )}
    </div>
  );
};

export default Dashboard;
