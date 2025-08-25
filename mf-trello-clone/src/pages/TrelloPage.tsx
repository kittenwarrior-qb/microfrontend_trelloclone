import React from "react";

const TrelloPage = React.lazy(() => import("TrelloPage/TrelloPage"));

const App: React.FC = () => {
  return (
    <div>
      <h1>Container App</h1>
      <React.Suspense fallback={<div>Loading Trello...</div>}>
        <TrelloPage />
      </React.Suspense>
    </div>
  );
};

export default App;
