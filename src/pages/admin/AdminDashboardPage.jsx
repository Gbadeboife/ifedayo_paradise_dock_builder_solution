import React from "react";
import { AuthContext } from "../../authContext";
import { GlobalContext } from "../../globalContext";
import {
  boat_lifts,
  dealers,
  wedges,
  docks,
  accessories,
  ramps
} from "../../data";
import MkdSDK from "Utils/MkdSDK";

const allData = [
  // {
  //   table: "dealers",
  //   data: dealers.model
  // },
  {
    table: "wedges",
    data: wedges.model
  },
  {
    table: "docks",
    data: docks.model
  },
  {
    table: "accessories",
    data: accessories.model
  },
  {
    table: "ramps",
    data: ramps.model
  },
  {
    table: "boat_lifts",
    data: boat_lifts.model
  }
];

const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const seedData = async () => {
    const sdk = new MkdSDK();
    const promise = allData?.map(async (item) => {
      sdk.setTable(item.table);

      const promise = item.data?.map(async (data) =>
        sdk.callRestAPI(data, "POST")
      );
      return Promise.all(promise);
    });
    await Promise.all(promise);
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "admin"
      }
    });
  }, []);
  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard{" "}
        {/* <button
          onClick={() => {
            seedData();
          }}
        >
          Seed all Data
        </button> */}
      </div>
    </>
  );
};

export default AdminDashboardPage;
