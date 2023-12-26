import React from "react";

const SearchBox = ({ setArtistId, artistId, handleFetchData }) => {
  return (
    <section className=" grid place-items-center place-content-center py-20">
      <h1 className=" font-bold text-2xl pb-10">How it works</h1>
      <main className=" grid gap-y-4">
        <article className="flex place-items-center items-center gap-2">
          <div className=" h-2 w-2 rounded-full bg-gray-300 mt-[4px]" />
          <h3 className=" text-base font-bold">Go to spotify</h3>
        </article>
        <article className="flex place-items-center items-center gap-2">
          <div className=" h-2 w-2 rounded-full bg-gray-300 mt-[4px]" />
          <h3 className=" text-base font-bold">
            Search for any of your favourite artist
          </h3>
        </article>
        <article className="flex place-items-center items-center gap-2">
          <div className=" h-2 w-2 rounded-full bg-gray-300 mt-[4px]" />
          <h3 className=" text-base font-bold">Click on the 3 dots </h3>
        </article>
        <article className="flex place-items-center items-center gap-2">
          <div className=" h-2 w-2 rounded-full bg-gray-300 mt-[4px]" />
          <h3 className=" text-base font-bold">
            Click on share and copy artist url
          </h3>
        </article>
      </main>
      <div className=" mt-10">
        <form onSubmit={handleFetchData}>
          <input
            type="text"
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            placeholder="Paste Artist Url Here"
            className="input input-bordered w-[350px] max-w-xs font-medium text-sm"
          />
        </form>
        {/* <button onClick={}>Click Me</button> */}
      </div>
    </section>
  );
};

export default SearchBox;
