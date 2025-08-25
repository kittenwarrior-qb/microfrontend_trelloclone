import React from "react";
import { Link } from "react-router-dom";
const HeaderRemote = React.lazy(() => import("RemoteComponents/Card"));

const Header: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading Header...</div>}>
      <HeaderRemote />
    </React.Suspense>
  );
};

export default Header;


