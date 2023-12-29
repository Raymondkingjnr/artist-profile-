import React from "react";

const SearchBox = ({
  searchQuery,
  setSearchQuery,
  handleSearchData,
  handleArtistClicked,
  searchData,
}) => {
  return (
    <section className=" grid place-items-center py-20">
      <h1 className=" font-bold  text-base md:text-2xl pb-10">How it works</h1>
      <main className=" grid  md:w-[350px] max-w-xs gap-y-4 ">
        <article className="flex place-items-center  gap-2">
          <div className=" h-2 w-2 rounded-full bg-gray-300 mt-[4px]" />
          <h3 className=" text-xs md:text-sm font-bold">
            Search For any artist
          </h3>
        </article>
      </main>
      <div className=" mt-10">
        <form onSubmit={handleSearchData}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Artist Name"
            className="input input-bordered md:w-[350px] max-w-xs font-medium text-sm"
          />
        </form>
        {/* <button onClick={}>Click Me</button> */}
      </div>

      {searchData.length > 0 && (
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-10 py-14 place-content-center ">
          {searchData.map((item, index) => (
            <figure
              className=" grid place-content-center place-items-center cursor-pointer"
              key={index}
              onClick={() => handleArtistClicked(item.id)}
            >
              <img
                src={item?.images[2]?.url}
                alt={item?.name}
                className=" h-32 w-32 rounded-full object-cover "
              />

              <h1 className=" font-bold text-xs text-gray-300 pt-4">
                {item?.name}
              </h1>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBox;
