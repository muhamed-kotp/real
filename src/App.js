import React, { useState, useEffect } from "react";
import "./Style/App.css";
import Shop from "./Components/Shop";
import Home from "./Components/Home";
import Navs from "./Components/Navs";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Control from "./Components/Control";
import { Routes, Route } from "react-router-dom";
import ShoppingCarD from "./Components/ShoppingCarD";
import Store from "./Context/Store";
import axios from "axios";
import Products from "./Components/Products";
import Details from "./Components/Details";
import Newproducts from "./Components/Newproducts";
import NewUser from "./Components/NewUser";
import Edit from "./Components/Edit";
import SideBar from "./Components/SideBar";
import Dashboard from "./Components/Dashboard";
import Users from "./Components/Users";
import UserDetails from "./Components/UserDetails";
import UserEdit from "./Components/UserEdit";
import { useNavigate } from "react-router-dom";
import Pay from "./Components/Pay";
import Test from "./Components/Test";



const App = () => {
  const [products, setProducts] = useState([]);
  const [data, setdata] = useState([]);
  const [users, setusers] = useState([]);
  const [male, setmale] = useState(0);
  const [female, setfemale] = useState(0);
  const [admin, setadmin] = useState(0);
  const [member, setmember] = useState(0);
  const [role, setRole] = useState("");
  const [lastName, setlastName] = useState(0);
  const [maxprice, setmaxprice] = useState(0);
  const [minprice, setminprice] = useState(0);
  const [fewestItem, setfewestItem] = useState(0);
  const [fewestID, setfewestID] = useState(0);
  const [signinUser, setsigninUser] = useState("");
  const [mail, setmail] = useState("");
  const [userNameErorr, setuserNameErorr] = useState("E-mail");
  const [pass, setpass] = useState("");
  const [passErorr, setpassErorr] = useState("Password");
  const [incorrect, setincorrect] = useState("");
  const [total, settotal] = useState([]);

  const getProduct = () => {
    axios({
      method: "get",
      url: "http://localhost:9000/products",
    }).then((Data) => {
      setProducts(Data.data);
      let max = Data.data[0].price;
      let min = Data.data[0].price;
      let minItem = Data.data[0].count;
      let minId = Data.data[0].id;

      Data.data.map((obj) => {
        if (obj.price >= max) {
          max = obj.price;
          setmaxprice(max);
        }
        if (obj.price <= min) {
          min = obj.price;
          setminprice(min);
        }
        if (obj.count <= minItem) {
          minItem = obj.count;
          minId = obj.id;
          setfewestItem(minItem);
          setfewestID(minId);
        }
        return Data.data;
      });
    });
  };
  const getusers = () => {
    axios({
      method: "get",
      url: "http://localhost:9000/users",
    }).then((Data) => {
      setusers(Data.data);

      let numMale = 0;
      let numFemale = 0;
      let admin = 0;
      let member = 0;
      let sum = [...Data.data];
      let lastname = "";
      sum = sum.map((e) => {
        lastname = e.name;
        setlastName(lastname);

        if (e.gender === "male") {
          numMale = numMale + 1;
          setmale(numMale);
        } else {
          numFemale = numFemale + 1;
          setfemale(numFemale);
        }
        if (e.role === "admin") {
          admin = admin + 1;
          setadmin(admin);
        } else {
          member = member + 1;
          setmember(member);
        }
        return sum;
      });
    });
  };

  const getRole = () => {
    axios({
      method: "get",
      url: "http://localhost:9000/signinuser/1",
    }).then((Data) => {
      const TheName = Data.data.name;

      users.map((e) => {
        if (e.name === TheName) {
          setRole(e.role);
          console.log(role);
        }
      });
    });
  };
  useEffect(() => {
    getRole();
  }, [signinUser]);

  const getsignUser = () => {
    axios({
      method: "get",
      url: "http://localhost:9000/signinuser/1",
    }).then((Data) => {
      const TheName = Data.data.name;
      setsigninUser(TheName);
      setincorrect("");
    });
  };

  const putData = (e) => {
    axios({
      method: "put",
      url: `http://localhost:9000/signinuser/1`,
      data: { name: e.name, mail, pass },
    }).then((data) => {
      getsignUser();
      getRole();
    });
  };
  const Navigate = useNavigate();

  const handelForm = (e) => {
    e.preventDefault();
    users.map((e) => {
      if (e.mail === mail && e.pass === pass) {
        putData(e);
        setincorrect("");
        Navigate("/");
      } else {
        setincorrect("Incorrect e-mail or Password");
      }
    });
  };
  const writeMail = (e) => {
    setmail(e.target.value);
  };
  const writePass = (e) => {
    setpass(e.target.value);
  };

  useEffect(() => {
    getProduct();
    getusers();
    getsignUser();
  }, []);

  const totalFunc = () => {
    const sum = data.reduce((accumulator, data) => {
      return accumulator + data.price * data.pusrches;
    }, 0);

    settotal(sum);
    // console.log(sum);
  };

  const buy = (obj) => {
    // console.log(obj.id);
    data.push(obj);
    let arr = [...new Set(data)];
    setdata(arr);
  };
  const add = (obj) => {
    let hanledata = [...data];
    hanledata = hanledata.map((e) => {
      if (e.id === obj.id) {
        if (e.count >= 1) {
          e.pusrches = e.pusrches + 1;
          e.count = e.count - 1;
        }
      }
      return e;
    });
    setdata(hanledata);
    totalFunc();
  };
  const dec = (obj) => {
    let hanledata = [...data];
    hanledata = hanledata.map((e) => {
      if (e.id === obj.id) {
        if (e.pusrches >= 2) {
          e.pusrches = e.pusrches - 1;
          e.count = e.count + 1;
        }
      }
      return e;
    });
    setdata(hanledata);
    totalFunc();
  };
  const remove = (obj) => {
    setdata((e) => e.filter((data) => data.id !== obj.id));
  };

  return (
    <Store.Provider
      value={{
        storeProducts: products,
        storeData: data,
        storeUsers: users,
        storeMale: male,
        storeFemale: female,
        storeAdmin: admin,
        storeMember: member,
        storelastName: lastName,
        storeMaxprice: maxprice,
        storeMinprice: minprice,
        storefewestItem: fewestItem,
        storefewestID: fewestID,
        storesigninUser: signinUser,
        storeincorrect: incorrect,
        storemail: mail,
        storeuserNameErorr: userNameErorr,
        storepass: pass,
        storepassErorr: passErorr,
        storeRole: role,
        storeTotal: total,

        StoreBuy: buy,
        StoreAdd: add,
        StoreDec: dec,
        StoreRemove: remove,
        StoreHandelForm: handelForm,
        StoreWriteMail: writeMail,
        StoreWritePass: writePass,
        StoregetsignUser: getsignUser,
        Storegetusers: getusers,
        StoregetTotal: totalFunc,
      }}
    >
      <div>
        <Navs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/ShoppingCarD" element={<ShoppingCarD />} />
          <Route path="/Shop/ShoppingCarD" element={<ShoppingCarD />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Control" element={<Control />} />
          <Route path="/Navs/ShoppingCarD" element={<ShoppingCarD />} />
          <Route path="/Navs" element={<Navs />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Pay" element={<Pay />} />
          <Route path="/Newproducs" element={<Newproducts />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/Edit/:ID" element={<Edit />} />
          <Route path="/UserEdit/:ID" element={<UserEdit />} />
          <Route path="/Products/:ID" element={<Details />} />
          <Route path="/Users/:ID" element={<UserDetails />} />
        </Routes>
      </div>
    </Store.Provider>
  );
};
export default App;
