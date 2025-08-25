import React from "react";
const Button = React.lazy(() => import("RemoteComponents/Button"));
const Card = React.lazy(() => import("RemoteComponents/Card"));


const Home: React.FC = () => {
  return (
    <div className="">

      <React.Suspense fallback={<div>Loading Card...</div>}>
        <Card />
      </React.Suspense>
      <React.Suspense fallback={<div>Loading Button...</div>}>
        <Button />
      </React.Suspense>
    </div>
  );
};

export default Home;
