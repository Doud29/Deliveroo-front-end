import "./App.scss";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Use Effect");

    const fetchData = async () => {
      const response = await axios.get("https://localhost:3200/");
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return <div className="App"></div>;
}

export default App;
