import React, { useEffect, useState } from "react";
import { fetchData } from "./utils";
import SearchBox from "./SearchBox";
import ArtistContainer from "./ArtistContainer";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [artistId, setArtistId] = useState("");

  useEffect(() => {
    // Check if data is stored in localStorage on component mount
    const storedData = localStorage.getItem("artistData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleFetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fetchedData = await fetchData(artistId);
      // console.log(fetchedData);
      setData(fetchedData);
      setArtistId("");
      setLoading(false);
      localStorage.setItem("artistData", JSON.stringify(fetchedData));
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(data);

  return (
    <div className="py-3 align-element">
      <nav className=" flex pt-2">
        <div className=" h-[35px] w-[1px] bg-orange-400" />
        <h1 className=" font-bold text-2xl px-4 text-gradient">TuneInBio</h1>
      </nav>
      <SearchBox
        setArtistId={setArtistId}
        artistId={artistId}
        handleFetchData={handleFetchData}
      />
      <ArtistContainer data={data} loading={loading} />
    </div>
  );
};

export default App;
