import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../Style/Products.css";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";
import Image from "react-bootstrap/Image";

import { MdPageview } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Products = () => {
  const [Products, setProducts] = useState([]);

  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:9000/products",
    }).then((data) => {
      setProducts(data.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const del = (object) => {
    axios({
      method: "delete",
      url: `http://localhost:9000/products/${object.id}`,
    }).then((data) => {
      getData();
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-2 sideBar">
          <SideBar />
        </div>

        <div className="col-10">
          <Nav.Link variant="dark" as={NavLink} to="/Newproducs">
            <Button className="add" variant="secondary">
              Add New Product
            </Button>
          </Nav.Link>

          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th className="head-id">id</th>
                <th className="head-title"> Product Image</th>
                <th className="head-title product-name-td"> Name</th>

                <th className="head-title"> Price</th>
                <th className="head-title"> Items </th>
                <th className="head-title"> Control</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((e) => (
                <tr key={e.id}>
                  <td className="id-col">{e.id}</td>

                  <td className="product-img-td">
                    <Image className="product-img" src={e.img} />
                  </td>

                  <td className="product-componenets-td   product-name-td">
                    <h5 className=" items-table">{e.name}</h5>
                  </td>

                  <td className="product-componenets-td">
                    <h5 className=" items-table">{e.price}</h5>
                  </td>
                  <td className="product-componenets-td">
                    <h5 className=" items-table">{e.count}</h5>
                  </td>
                  <td className="btns-componenets-td">
                    <div className="Btn-Container">
                      <Nav.Link
                        variant="dark"
                        as={NavLink}
                        to={`/Products/${e.id}`}
                      >
                        <Button className="product-btn-sm" variant="success">
                          Edit
                        </Button>
                        <MdPageview className="product-icon-sm magnify" />
                      </Nav.Link>
                      <Nav.Link as={NavLink} to={`/Edit/${e.id}`}>
                        <Button className="product-btn-sm" variant="warning">
                          Edit
                        </Button>
                        <AiTwotoneEdit className="product-icon-sm pin" />
                      </Nav.Link>

                      <Button
                        className="product-btn-sm"
                        variant="danger"
                        onClick={() => del(e)}
                      >
                        DeleTe
                      </Button>

                      <Button
                        className="product-btn-basket-sm"
                        variant="link"
                        onClick={() => del(e)}
                      >
                        <RiDeleteBin6Line className="product-icon-sm basket" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Products;
