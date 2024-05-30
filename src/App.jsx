import React from "react";
import { Suspense, lazy } from "react";

const Weather = lazy(() => import("./Weather Components/Weather"));
const App = () => {
  return (
    <div className="main-background">
      <h1 className="head">Find your City Weather Here</h1>
      <Suspense
        fallback={<span className="fallback-text">Content is Loading..</span>}
      >
        <Weather />
      </Suspense>
    </div>
  );
};

export default App;
