"use client";

import { Route, Switch } from "wouter";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Signup from "./pages/signup";

export default function ReactLandingApp() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}
