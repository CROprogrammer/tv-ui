import React from "react";

import LandingPage from "./pages/landing/LandingPage";
import { Route, Switch } from "react-router-dom";
import RegisterPage from "./pages/registration/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import ChannelPage from "./pages/channels/ChannelPage";
import EditChannelPage from "./pages/channels/EditChannelPage";
import CategoriesPage from "./pages/categories/CategoriesPage";
import EditCategoryPage from "./pages/categories/EditCategoryPage";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/channels" exact component={ChannelPage} />
      <Route path="/channels/:id/edit" exact component={EditChannelPage} />
      <Route path="/categories" exact component={CategoriesPage} />
      <Route path="/categories/:id/edit" exact component={EditCategoryPage} />

      {/*<Route path="/" exact component={LandingPage} />*/}
      {/*{!isUserLoggedIn() && (*/}
      {/*  <Route path="/register" exact component={RegisterPage} />*/}
      {/*)}*/}
      {/*{!isUserLoggedIn() && <Route path="/login" exact component={LoginPage} />}*/}
      {/*{isUserLoggedIn() && (*/}
      {/*  <Route path="/channels" exact component={ChannelPage} />*/}
      {/*)}*/}
    </Switch>
  );
}
