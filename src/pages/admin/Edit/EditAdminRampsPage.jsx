import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { GlobalContext, showToast } from "Src/globalContext";
import { AuthContext, tokenExpireError } from "Src/authContext";
import MkdSDK from "Utils/MkdSDK";
import { isImage } from "Utils/utils";
import { InteractiveButton } from "Components/InteractiveButton";

let sdk = new MkdSDK();

const EditAdminRampsPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const schema = yup
    .object({
      category: yup.string().required(),
      length: yup.string().required(),
      width: yup.string().required(),
      image: yup.string().required(),
      top_view: yup.string().required(),
      material: yup.string().required(),
    })
    .required();
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const [fileObj, setFileObj] = React.useState({});
  const navigate = useNavigate();
  const [category, setCategory] = useState(0);
  const [length, setLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [image, setImage] = useState("");
  const [top_view, setTopView] = useState("");
  const [material, setMaterial] = useState(0);
  const [id, setId] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const params = useParams();

  useEffect(function () {
    (async function () {
      try {
        sdk.setTable("ramps");
        const result = await sdk.callRestAPI({ id: Number(params?.id) }, "GET");
        if (!result.error) {
          setValue("category", result.model.category);
          setValue("length", result.model.length);
          setValue("width", result.model.width);
          setValue("image", result.model.image);
          setValue("top_view", result.model.top_view);
          setValue("material", result.model.material);

          setCategory(result.model.category);
          setLength(result.model.length);
          setWidth(result.model.width);
          setImage(result.model.image);
          setTopView(result.model.top_view);
          setMaterial(result.model.material);
          setId(result.model.id);
        }
      } catch (error) {
        console.log("error", error);
        tokenExpireError(dispatch, error.message);
      }
    })();
  }, []);

  const previewImage = (field, target) => {
    let tempFileObj = fileObj;
    tempFileObj[field] = {
      file: target.files[0],
      tempURL: URL.createObjectURL(target.files[0]),
    };
    setFileObj({ ...tempFileObj });
  };

  const onSubmit = async (data) => {
    try {
      // Local Uploads
      // for (let item in fileObj) {
      //   let uploadResult = await sdk.upload(fileObj[item].file);
      //   data[item] = uploadResult.url;
      // }
      setSubmitLoading(true);
      // S3 Uploads
      for (let item in fileObj) {
        let formData = new FormData();
        formData.append("file", fileObj[item].file);
        let uploadResult = await sdk.uploadImage(formData);
        data[item] = uploadResult.url;
      }

      const result = await sdk.callRestAPI(
        {
          id: id,
          category: data.category,
          length: data.length,
          width: data.width,
          image: data.image,
          top_view: data.top_view,
          material: data.material,
        },
        "PUT"
      );

      if (!result.error) {
        showToast(globalDispatch, "Updated");
        navigate("/admin/ramps");
        setSubmitLoading(false);
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
        setSubmitLoading(false);
      }
    } catch (error) {
      setSubmitLoading(false);
      console.log("Error", error);
      setError("category", {
        type: "manual",
        message: error.message,
      });
    }
  };
  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "ramps",
      },
    });
  }, []);

  return (
    <div className=" shadow-md rounded   mx-auto p-5">
      <h4 className="text-2xl font-medium">Edit Ramps</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            {...register("category")}
            className={`"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.category?.message ? "border-red-500" : ""
            }`}
          >
            <option value="">Select</option>
            <option value="0">Pivot Ramp</option>
            <option value="1">Truss Ramp</option>
          </select>
          <p className="text-red-500 text-xs italic">
            {errors.category?.message}
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
          ) : image ? (
            <img className={"preview-image"} src={image}></img>
          ) : null}

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
          ) : top_view ? (
            <img className={"preview-image"} src={top_view}></img>
          ) : null}

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

        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="material"
          >
            Material
          </label>
          <select
            {...register("material")}
            className={`"shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.material?.message ? "border-red-500" : ""
            }`}
          >
            {" "}
            <option value="">Select</option>
            <option value="0">Wood Grain</option>
            <option value="1">Grey Aluminium</option>
            <option value="2">Perforated</option>
          </select>
          <p className="text-red-500 text-xs italic">
            {errors.material?.message}
          </p>
        </div>

        <InteractiveButton
          loading={submitLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </InteractiveButton>
      </form>
    </div>
  );
};

export default EditAdminRampsPage;
