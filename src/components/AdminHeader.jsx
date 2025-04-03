import React from "react";
import { AuthContext } from "../authContext";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../globalContext";
export const AdminHeader = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { state } = React.useContext(GlobalContext);

  return (
    <>
      <div className={`sidebar-holder ${!state.isOpen ? "open-nav" : ""}`}>
        <div className="sticky top-0 h-fit">
          <div className="w-full p-4 bg-sky-500">
            <div className="text-white font-bold text-center text-2xl">
              Admin
            </div>
          </div>
          <div className="w-full sidebar-list">
            <ul className="flex flex-wrap">
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/dashboard"
                  className={`${
                    state.path == "admin" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Dashboard
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/accessories"
                  className={`${
                    state.path == "accessories" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Accessories
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/email"
                  className={`${
                    state.path == "email" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Email
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/photo"
                  className={`${
                    state.path == "photo" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Photo
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/boat_lifts"
                  className={`${
                    state.path == "boat_lifts" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Boat Lifts
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/dealers"
                  className={`${
                    state.path == "dealers" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Dealers
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/docks"
                  className={`${
                    state.path == "docks" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Docks
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/cms"
                  className={`${
                    state.path == "cms" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Cms
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/instructions"
                  className={`${
                    state.path == "instructions" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Instructions
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/user"
                  className={`${
                    state.path == "user" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  User
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/quotes"
                  className={`${
                    state.path == "quotes" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Quotes
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/wedges"
                  className={`${
                    state.path == "wedges" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Wedges
                </NavLink>
              </li>
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/ramps"
                  className={`${
                    state.path == "ramps" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Ramps
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/quotes_mail_recipients"
                  className={`${
                    state.path == "quotes_mail_recipients"
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                >
                  Quotes Mail Recipients
                </NavLink>
              </li>

              <li className="list-none block w-full">
                <NavLink
                  to="/admin/profile"
                  className={`${
                    state.path == "profile" ? "text-black bg-gray-200" : ""
                  }`}
                >
                  Profile
                </NavLink>
              </li>
              <li className="list-none block w-full">
                <NavLink
                  to="/admin/login"
                  onClick={() =>
                    dispatch({
                      type: "LOGOUT",
                    })
                  }
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
