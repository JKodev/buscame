// Routes

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// We're using `react-router-dom` to handle routing, so grab the `RouteProps`
// type that we'll use to ensure our own types conform to the expected configuration
import { RouteProps } from "react-router-dom";

/* Local */

// Components

// By default, pull in the ReactQL example. In your own project, just nix
// the `src/components/example` folder and replace the following line with
// your own React components
// import Example from "@/components/example";
import Main from "@/components/main";
import Wrapper from "@/components/wrapper";

// ----------------------------------------------------------------------------

// Specify the routes. This is provided as an array of `RouteProp`, which is
// a type provided by `react-router-dom` for rendering a route. Typically, this
// will contain at least a component and a path
const routes: RouteProps[] = [
  {
    component: Main, // <-- this is the component that'll be rendered
    exact: true, // <-- this says to ONLY match when the path is exactly '/'
    path: "/", // <-- ... and this is the actual path to match on
  },
  {
    component: Wrapper,
    exact: true,
    path: "/wrapper",
  },
];

export default routes;
