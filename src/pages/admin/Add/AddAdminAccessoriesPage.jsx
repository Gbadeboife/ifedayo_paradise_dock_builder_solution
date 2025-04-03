import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import MkdSDK from "Utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import MkdSDK from "Utils/MkdSDK";
import { isImage } from "Utils/utils";
import { GlobalContext, showToast } from "Src/globalContext";
import { AuthContext, tokenExpireError } from "Src/authContext";

const AddAdminAccessoriesPage = () => {
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);
  const schema = yup
    .object({
      name: yup.string().required(),
      length: yup.string().required(),
      width: yup.string().required(),
      thumbnail: yup.string().required(),
      top_view: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
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

      sdk.setTable("accessories");

      const result = await sdk.callRestAPI(
        {
          name: data.name,
          length: data.length,
          width: data.width,
          thumbnail: data.thumbnail,
          top_view: data.top_view,
        },
        "POST"
      );
      if (!result.error) {
        showToast(globalDispatch, "Added");
        navigate("/admin/accessories");
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
      setError("name", {
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
        path: "accessories",
      },
    });
  }, []);

  return (
    <div className=" shadow-md rounded  mx-auto p-5">
      <h4 className="text-2xl font-medium">Add Accessories</h4>
      <form className=" w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            placeholder="name"
            {...register("name")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
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
            htmlFor="thumbnail"
          >
            Thumbnail
          </label>
          {fileObj["thumbnail"] ? (
            isImage(fileObj["thumbnail"]) ? (
              <img
                className={"preview-image"}
                src={fileObj["thumbnail"]["tempURL"]}
              ></img>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}

          <input
            type="file"
            placeholder="thumbnail"
            {...register("thumbnail", {
              onChange: (e) => previewImage("thumbnail", e.target),
            })}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.thumbnail?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.thumbnail?.message}
          </p>
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

export default AddAdminAccessoriesPage;
