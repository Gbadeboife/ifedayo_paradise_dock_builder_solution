import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "Src/globalContext";
import { AuthContext, tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";
import { isImage } from "Utils/utils";
import { BoatLiftRange } from "Utils/constants";

const AddAdminBoatLiftsPage = () => {
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const schema = yup
    .object({
      model: yup.string().required(),
      weight_capacity: yup.number().required(),
      lift_range: yup.number().required().positive().integer(),
      no_of_cylinders: yup.number().required().positive().integer(),
      length: yup.string().required(),
      width: yup.string().required(),
      image: yup.string().required(),
      top_view: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(GlobalContext);
  const [fileObj, setFileObj] = React.useState({});

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const previewImage = (field, target) => {
    let tempFileObj = fileObj;
    tempFileObj[field] = {
      file: target.files[0],
      tempURL: URL.createObjectURL(target.files[0]),
    };
    setFileObj({ ...tempFileObj });
  };

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();

    try {
      // Local Uploads
      // for (let item in fileObj) {
      //   let uploadResult = await sdk.upload(fileObj[item].file);
      //   data[item] = uploadResult.url;
      // }

      // S3 Uploads
      for (let item in fileObj) {
        let formData = new FormData();
        formData.append("file", fileObj[item].file);
        let uploadResult = await sdk.uploadImage(formData);
        data[item] = uploadResult.url;
      }

      sdk.setTable("boat_lifts");

      const result = await sdk.callRestAPI(
        {
          model: data.model,
          weight_capacity: data.weight_capacity,
          lift_range: data.lift_range,
          no_of_cylinders: data.no_of_cylinders,
          length: data.length,
          width: data.width,
          image: data.image,
          top_view: data.top_view,
        },
        "POST"
      );
      if (!result.error) {
        showToast(globalDispatch, "Added");
        navigate("/admin/boat_lifts");
      } else {
        if (result.validation) {
          const keys = Object.keys(result.validation);
          for (let i = 0; i < keys.length; i++) {
            const field = keys[i];
            setError(field, {
              type: "manual",
              message: result.validation[field],
            });
          }
        }
      }
    } catch (error) {
      console.log("Error", error);
      setError("model", {
        type: "manual",
        message: error.message,
      });
      tokenExpireError(dispatch, error.message);
    }
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "boat_lifts",
      },
    });
  }, []);

  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">Add BoatLifts</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="model"
          >
            Model
          </label>
          <input
            placeholder="model"
            {...register("model")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.model?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.model?.message}</p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="weight_capacity"
          >
            Weight Capacity
          </label>
          <input
            placeholder="weight_capacity"
            {...register("weight_capacity")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.weight_capacity?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.weight_capacity?.message}
          </p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lift_range"
          >
            Lift Range
          </label>
          <select
            placeholder="lift_range"
            {...register("lift_range")}
            className={`"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.lift_range?.message ? "border-red-500" : ""
            }`}
          >
            {BoatLiftRange.map((liftRange) => (
              <option key={`${liftRange}_BEN`} value={liftRange}>
                {liftRange}ft
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs italic">
            {errors.lift_range?.message}
          </p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="no_of_cylinders"
          >
            No Of Cylinders
          </label>
          <select
            {...register("no_of_cylinders")}
            className={`"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.no_of_cylinders?.message ? "border-red-500" : ""
            }`}
          >
            <option value="2">2</option>
            <option value="4">4</option>
          </select>
          <p className="text-red-500 text-xs italic">
            {errors.no_of_cylinders?.message}
          </p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="length"
          >
            Length
          </label>
          <input
            placeholder="length"
            {...register("length")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.length?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.length?.message}
          </p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="width"
          >
            Width
          </label>
          <input
            placeholder="width"
            {...register("width")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.width?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.width?.message}</p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          {fileObj["image"] ? (
            isImage(fileObj["image"]) ? (
              <img
                className={"preview-image"}
                src={fileObj["image"]["tempURL"]}
              ></img>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <input
            type="file"
            placeholder="image"
            {...register("image", {
              onChange: (e) => previewImage("image", e.target),
            })}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.image?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.image?.message}</p>
        </div>

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="top_view"
          >
            Top View
          </label>
          {fileObj["top_view"] ? (
            isImage(fileObj["top_view"]) ? (
              <img
                className={"preview-image"}
                src={fileObj["top_view"]["tempURL"]}
              ></img>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <input
            type="file"
            placeholder="top_view"
            {...register("top_view", {
              onChange: (e) => previewImage("top_view", e.target),
            })}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.top_view?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.top_view?.message}
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAdminBoatLiftsPage;
