import { createContext } from "react";

const Store = createContext({
  storeProducts: [],
  storeData: [],
  storeUsers: [],
  storeMale: 0,
  storelastName: "",
  storeRole: "",
  storeFemale: 0,
  storeAdmin: 0,
  storeMember: 0,
  storeMaxprice: 0,
  storeMinprice: 0,
  storefewestItem: 0,
  storefewestID: 0,
  storesigninUser: "",
  storeincorrect: "",
  storemail: "",
  storeuserNameErorr: "",
  storepass: "",
  storepassErorr: "",
  storeTotal: 0,

  Storegetusers: () => {},
  StoreBuy: () => {},
  StoreAdd: () => {},
  StoreDec: () => {},
  StoreRemove: () => {},
  StoremakeAdmin: () => {},
  StoreHandelForm: () => {},
  StoreWriteMail: () => {},
  StoreWritePass: () => {},
  StoregetsignUser: () => {},
  Storesignout: () => {},
  StoregetTotal: () => {},
});

export default Store;
