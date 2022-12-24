import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

const Details = () => {
  const { ID } = useParams();

  const [data, setdata] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:9000/products/${ID}`,
    }).then((data) => {
      setdata(data.data);
    });
  }, []);

  return (
    <div className="row">
      <div className="col-2 sideBar">
        <SideBar />
      </div>

      <div className="col-10">
        <h1> name = {data.name}</h1>
        <h1> price = {data.price}</h1>
        <h1> items = {data.count}</h1>
      </div>
    </div>
  );
};

export default Details;
