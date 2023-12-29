import React, { useEffect, useState } from "react";
import { fetchData, searchArtist } from "./utils";
import SearchBox from "./SearchBox";
import ArtistContainer from "./ArtistContainer";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumType, setAlbumType] = useState("album");

  useEffect(() => {
    if (selectedArtist) {
      handleFetchData(selectedArtist);
    }
  }, [selectedArtist, albumType]);

  const handleFetchData = async (artistId) => {
    setLoading(true);
    try {
      const fetchedData = await fetchData(artistId, albumType);
      setData(fetchedData);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  // console.log(data);

  const handleSearchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!searchQuery) {
        alert("Search Box cannot be empty.");
      }
      const result = await searchArtist(searchQuery);
      console.log(result);
      setSearchData(result);
      setLoading(false);
    } catch (error) {
      alert("error", error.message);
    }
    setLoading(false);
  };

  const handleArtistClicked = async (artistId) => {
    try {
      await handleFetchData(artistId);
      setSelectedArtist(artistId);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAlbumTypeChange = (type) => {
    setAlbumType(type);
  };

  const handleAlbumClick = (albumId) => {
    const album = data.albumData.find((item) => item.id === albumId);
    setSelectedAlbum(album);
  };

  const handleAlbumClose = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="py-3 align-element">
      <nav className=" flex pt-2">
        <div className=" h-[35px] w-[1px] bg-orange-400" />
        <h1 className=" font-bold text-2xl px-4 text-gradient">TuneInBio</h1>
      </nav>
      <SearchBox
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchData={handleSearchData}
        searchData={searchData}
        handleArtistClicked={handleArtistClicked}
        loading={loading}
      />
      <ArtistContainer
        data={data}
        loading={loading}
        handleAlbumClick={handleAlbumClick}
        handleAlbumClose={handleAlbumClose}
        selectedAlbum={selectedAlbum}
        handleAlbumTypeChange={handleAlbumTypeChange}
        albumType={albumType}
      />
    </div>
  );
};

export default App;
