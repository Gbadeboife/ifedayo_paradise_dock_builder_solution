import React from "react";
import { useParams } from "react-router-dom";

import { GlobalContext } from "Src/globalContext";
import { tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";

let sdk = new MkdSDK();
const categoryMapping = {
  0: "Floating Dock",
  1: "Sectional Dock",
  2: "Roll-In Dock",
};
const materialMapping = {
  0: "Wood Grain",
  1: "Perforated",
  2: "Grey Aluminium",
};
const ViewAdminWedgesPage = () => {
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const { dispatch } = React.useContext(GlobalContext);
  const [viewModel, setViewModel] = React.useState({});

  const params = useParams();

  React.useEffect(function () {
    (async function () {
      try {
        sdk.setTable("wedges");
        const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
        if (!result.error) {
          setViewModel(result.model);
        }
      } catch (error) {
        console.log("error", error);
        tokenExpireError(dispatch, error.message);
      }
    })();
  }, []);
  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">View Wedges</h4>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Category</div>
          <div className="flex-1">{categoryMapping[viewModel?.category]}</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Length</div>
          <div className="flex-1">{viewModel?.length}</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Width</div>
          <div className="flex-1">{viewModel?.width}</div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Image</div>
          <div className="flex-1">
            <a target="_blank" href={viewModel?.image}>
              View
            </a>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Top View</div>
          <div className="flex-1">
            <a target="_blank" href={viewModel?.top_view}>
              View
            </a>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-4">
        <div className="flex mb-4">
          <div className="flex-1">Material</div>
          <div className="flex-1">{materialMapping[viewModel?.material]}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminWedgesPage;
