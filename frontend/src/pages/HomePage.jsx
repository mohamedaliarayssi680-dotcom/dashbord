import React from "react";
import Header from "../components/Header";
import OverviewCards from "../components/OverviewCards";
import Sales from "../components/Sales";
import Sales2 from "../components/Sales2";
const HomePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"Page Home"} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <OverviewCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Sales />
          <Sales2 />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
