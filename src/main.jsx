import React from "react";
import { AuthContext } from "./authContext";
import { Routes, Route } from "react-router-dom";

import { AdminHeader, TopHeader, PublicHeader, SnackBar } from "./components";

import { NotFoundPage } from "Pages/404";

import {
  AddAdminAccessoriesPage,
  AddAdminBoatLiftsPage,
  AddAdminCmsPage,
  AddAdminDealersPage,
  AddAdminDocksPage,
  AddAdminEmailPage,
  AddAdminInstructionsPage,
  AddAdminPhotoPage,
  AddAdminQuotesPage,
  AddAdminUserPage,
  AddAdminWedgesPage,
  AddAdminQuotesMailRecipientsPage,
  AdminQuotesMailRecipientsListPage,
  AdminAccessoriesListPage,
  AdminBoatLiftsListPage,
  AdminCmsListPage,
  AdminDashboardPage,
  AdminDealersListPage,
  AdminDocksListPage,
  AdminEmailListPage,
  AdminForgotPage,
  AdminInstructionsListPage,
  AdminLoginPage,
  AdminPhotoListPage,
  AdminProfilePage,
  AdminQuotesListPage,
  AdminResetPage,
  AdminUserListPage,
  AdminWedgesListPage,
  EditAdminAccessoriesPage,
  EditAdminBoatLiftsPage,
  EditAdminCmsPage,
  EditAdminDealersPage,
  EditAdminDocksPage,
  EditAdminEmailPage,
  EditAdminInstructionsPage,
  EditAdminQuotesPage,
  EditAdminUserPage,
  EditAdminWedgesPage,
  EditAdminQuotesMailRecipientsPage,
  ViewAdminAccessoriesPage,
  ViewAdminBoatLiftsPage,
  ViewAdminDealersPage,
  ViewAdminDocksPage,
  ViewAdminInstructionsPage,
  ViewAdminQuotesPage,
  ViewAdminWedgesPage,
  ViewAdminQuotesMailRecipientsPage,
  AdminRampsListPage,
  AddAdminRampsPage,
  ViewAdminRampsPage,
  EditAdminRampsPage,
} from "Pages/admin";

import { DockBuilderPage } from "Pages/dock";

function renderHeader(role) {
  switch (role) {
    case "admin":
      return <AdminHeader />;

    default:
      return <PublicHeader />;
  }
}

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route exact path="/admin" element={<AdminDashboardPage />}></Route>
          <Route
            exact
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
          <Route
            exact
            path="/admin/profile"
            element={<AdminProfilePage />}
          ></Route>

          <Route
            path="/admin/accessories"
            element={<AdminAccessoriesListPage />}
          ></Route>
          <Route
            path="/admin/add-accessories"
            element={<AddAdminAccessoriesPage />}
          ></Route>
          <Route
            path="/admin/edit-accessories/:id"
            element={<EditAdminAccessoriesPage />}
          ></Route>
          <Route
            path="/admin/view-accessories/:id"
            element={<ViewAdminAccessoriesPage />}
          ></Route>

          <Route
            path="/admin/quotes_mail_recipients"
            element={<AdminQuotesMailRecipientsListPage />}
          ></Route>
          <Route
            path="/admin/add-quotes_mail_recipients"
            element={<AddAdminQuotesMailRecipientsPage />}
          ></Route>
          <Route
            path="/admin/edit-quotes_mail_recipients/:id"
            element={<EditAdminQuotesMailRecipientsPage />}
          ></Route>
          <Route
            path="/admin/view-quotes_mail_recipients/:id"
            element={<ViewAdminQuotesMailRecipientsPage />}
          ></Route>

          <Route path="/admin/email" element={<AdminEmailListPage />}></Route>
          <Route
            path="/admin/add-email"
            element={<AddAdminEmailPage />}
          ></Route>
          <Route
            path="/admin/edit-email/:id"
            element={<EditAdminEmailPage />}
          ></Route>

          <Route path="/admin/photo" element={<AdminPhotoListPage />}></Route>
          <Route
            path="/admin/add-photo"
            element={<AddAdminPhotoPage />}
          ></Route>

          <Route
            path="/admin/boat_lifts"
            element={<AdminBoatLiftsListPage />}
          ></Route>
          <Route
            path="/admin/add-boat_lifts"
            element={<AddAdminBoatLiftsPage />}
          ></Route>
          <Route
            path="/admin/edit-boat_lifts/:id"
            element={<EditAdminBoatLiftsPage />}
          ></Route>
          <Route
            path="/admin/view-boat_lifts/:id"
            element={<ViewAdminBoatLiftsPage />}
          ></Route>

          <Route
            path="/admin/dealers"
            element={<AdminDealersListPage />}
          ></Route>
          <Route
            path="/admin/add-dealers"
            element={<AddAdminDealersPage />}
          ></Route>
          <Route
            path="/admin/edit-dealers/:id"
            element={<EditAdminDealersPage />}
          ></Route>
          <Route
            path="/admin/view-dealers/:id"
            element={<ViewAdminDealersPage />}
          ></Route>

          <Route path="/admin/docks" element={<AdminDocksListPage />}></Route>
          <Route
            path="/admin/add-docks"
            element={<AddAdminDocksPage />}
          ></Route>
          <Route
            path="/admin/edit-docks/:id"
            element={<EditAdminDocksPage />}
          ></Route>
          <Route
            path="/admin/view-docks/:id"
            element={<ViewAdminDocksPage />}
          ></Route>

          <Route path="/admin/cms" element={<AdminCmsListPage />}></Route>
          <Route path="/admin/add-cms" element={<AddAdminCmsPage />}></Route>
          <Route
            path="/admin/edit-cms/:id"
            element={<EditAdminCmsPage />}
          ></Route>

          <Route
            path="/admin/instructions"
            element={<AdminInstructionsListPage />}
          ></Route>
          <Route
            path="/admin/add-instructions"
            element={<AddAdminInstructionsPage />}
          ></Route>
          <Route
            path="/admin/edit-instructions/:id"
            element={<EditAdminInstructionsPage />}
          ></Route>
          <Route
            path="/admin/view-instructions/:id"
            element={<ViewAdminInstructionsPage />}
          ></Route>

          <Route path="/admin/user" element={<AdminUserListPage />}></Route>
          <Route path="/admin/add-user" element={<AddAdminUserPage />}></Route>
          <Route
            path="/admin/edit-user/:id"
            element={<EditAdminUserPage />}
          ></Route>

          <Route path="/admin/quotes" element={<AdminQuotesListPage />}></Route>
          <Route
            path="/admin/add-quotes"
            element={<AddAdminQuotesPage />}
          ></Route>
          <Route
            path="/admin/edit-quotes/:id"
            element={<EditAdminQuotesPage />}
          ></Route>
          <Route
            path="/admin/view-quotes/:id"
            element={<ViewAdminQuotesPage />}
          ></Route>

          <Route path="/admin/wedges" element={<AdminWedgesListPage />}></Route>
          <Route
            path="/admin/add-wedges"
            element={<AddAdminWedgesPage />}
          ></Route>
          <Route
            path="/admin/edit-wedges/:id"
            element={<EditAdminWedgesPage />}
          ></Route>
          <Route
            path="/admin/view-wedges/:id"
            element={<ViewAdminWedgesPage />}
          ></Route>

          <Route path="/admin/ramps" element={<AdminRampsListPage />}></Route>
          <Route
            path="/admin/add-ramps"
            element={<AddAdminRampsPage />}
          ></Route>
          <Route
            path="/admin/edit-ramps/:id"
            element={<EditAdminRampsPage />}
          ></Route>
          <Route
            path="/admin/view-ramps/:id"
            element={<ViewAdminRampsPage />}
          ></Route>

          {/* <Route
            path="*"
            element={<Navigate to="/admin" /> || <NotFoundPage />}
          ></Route> */}
        </Routes>
      );

    default:
      return (
        <Routes>
          <Route exact path="/" element={<DockBuilderPage />}></Route>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route
            exact
            path="/admin/forgot"
            element={<AdminForgotPage />}
          ></Route>
          <Route exact path="/admin/reset" element={<AdminResetPage />}></Route>

          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      );
  }
}

function Main() {
  const { state } = React.useContext(AuthContext);

  return (
    <div className="h-full">
      <div className="flex w-full">
        {!state.isAuthenticated ? <PublicHeader /> : renderHeader(state?.role)}
        <div className="w-full">
          {state.isAuthenticated ? <TopHeader /> : null}
          <div className="page-wrapper w-full">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state?.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  );
}

export default Main;
