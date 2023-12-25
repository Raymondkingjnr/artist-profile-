import React, { useEffect, useState } from "react";
import { fetchedata } from "./utils";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataAndDisplay = async () => {
      try {
        const fetchedData = await fetchedata();
        console.log(fetchedData);
        setData(fetchedData);
      } catch (error) {
        // Handle errors
      }
    };

    fetchDataAndDisplay();
  }, []);
  return (
    <div className=" grid place-items-center py-3">
      <h1 className=" text-center font-bold text-lg">Hello world</h1>
    </div>
  );
};

export default App;
