import React from "react";
import { converMillisecToMins, number_formatter } from "./utils";

const ArtistContainer = ({
  data,
  loading,
  handleAlbumClick,
  handleAlbumClose,
  selectedAlbum,
  albumType,
  handleAlbumTypeChange,
}) => {
  const artist_info = data?.artistInfo;
  const artist_top_tracks = data?.topTracks;
  const artist_related_artists = data?.relatedArtists?.artists;

  if (loading) {
    return (
      <div className=" grid place-content-center">
        <span className="loading loading-infinity loading-lg text-warning"></span>
      </div>
    );
  }

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  // FOLLOWERS
  const followers = artist_info?.followers?.total;

  return (
    <section className=" ">
      {/* ARTIST INFO */}

      <main className="md:w-[300px] grid place-content-center md:place-content-start">
        {artist_info?.images ? (
          <img
            src={artist_info?.images[2]?.url}
            alt=""
            className=" h-56 w-56 rounded-full object-cover "
          />
        ) : (
          ""
        )}

        <div className=" mt-5 grid place-items-center md:place-items-start gap-y-5">
          <h1 className=" font-bold text-sm text-gray-400">
            {artist_info?.name}
          </h1>

          {followers ? (
            <p className=" font-bold text-sm text-gray-400">
              {" "}
              {number_formatter(followers)} Monthly Listeners{" "}
            </p>
          ) : (
            ""
          )}
        </div>
      </main>

      {/* ARTIST TOP TRACKS */}

      <main className=" my-20">
        {artist_top_tracks?.tracks ? (
          <h1 className=" font-bold text-base md:text-2xl text-white">
            {" "}
            Top Tracks
          </h1>
        ) : (
          ""
        )}

        <ul className=" grid gap-y-6 mt-10">
          {artist_top_tracks?.tracks?.slice(0, 5)?.map((item, index) => (
            <li
              key={index}
              className=" flex flex-col md:flex-row gap-y-2 justify-between  border-b-2 border-gray-800 rounded-lg pb-5"
            >
              <div className=" flex gap-4 place-items-center">
                <span className=" grid place-items-center w-7 h-7 rounded-full items-cent bg-gradient-to-l from-red-500 to-orange-400 ">
                  <p className=" text-gray-50 font-bold text-sm">{index + 1}</p>
                </span>{" "}
                <h1 className=" font-bold text-xs md:text-sm text-gray-400">
                  {" "}
                  {truncateText(item?.name, 50)}
                </h1>
              </div>
              <p className=" font-bold text-sm text-gray-400">
                {converMillisecToMins(item?.duration_ms)}
              </p>
            </li>
          ))}
        </ul>
      </main>

      {/* ARTIST ALBUMS */}

      <main className="my-20 relative">
        {data?.albumData ? (
          <h1 className=" font-bold  text-base md:text-2xl text-white">
            {" "}
            Albums
          </h1>
        ) : (
          ""
        )}
        <main>
          {data?.albumData ? (
            <div className=" flex gap-2 place-content-center md:place-content-start pt-5">
              <div
                role="button"
                onClick={() => handleAlbumTypeChange("album")}
                className={
                  albumType === "album"
                    ? " btn font-bold text-sm border-red-100 text-gray-800  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize "
                    : "btn font-bold text-sm  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize"
                }
              >
                Albums
              </div>
              <div
                role="button"
                onClick={() => handleAlbumTypeChange("single")}
                className={
                  albumType === "single"
                    ? " btn font-bold text-sm border-red-100 text-gray-800  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize "
                    : "btn font-bold text-sm  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize"
                }
              >
                single's
              </div>
              <div
                role="button"
                onClick={() => handleAlbumTypeChange("appears_on")}
                className={
                  albumType === "appears_on"
                    ? " btn font-bold text-sm border-red-100 text-gray-800  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize "
                    : "btn font-bold text-sm  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize"
                }
              >
                appears_on
              </div>
            </div>
          ) : (
            ""
          )}
          {/* <div>
            <a
              href={data?.albumData?.external_urls?.spotify}
              target="_blank"
              className=" btn font-bold text-sm  bg-gradient-to-l from-red-500 to-orange-400 border-transparent capitalize "
            >
              View More
            </a>
          </div> */}
        </main>

        <div className=" pt-9">
          {data?.albumData < 1 ? (
            <h1 className=" text-center font-bold text-gray-300 text-lg">
              Album Not Found
            </h1>
          ) : (
            <aside className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 items-center place-content-center  place-items-center gap-4">
              {data?.albumData?.slice(0, 12)?.map((album, index) => {
                const { images, name, release_date, total_tracks, id } = album;
                return (
                  <div key={index}>
                    <img
                      src={images[0]?.url}
                      alt={name}
                      className=" w-40 h-48 rounded-md object-cover cursor-pointer"
                      onClick={() => handleAlbumClick(id)}
                    />
                    <div className=" pt-4">
                      {total_tracks ? (
                        <h1 className=" font-bold text-xs text-gray-50">
                          {total_tracks}
                          {" Tracks  "}
                        </h1>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
            </aside>
          )}
        </div>

        {/* MODAL_BOX */}
        {selectedAlbum && (
          <div className=" transition duration-500 ease-in-out">
            <div
              className="fixed z-30 w-full h-full blur-bg top-0 left-0"
              onClick={handleAlbumClose}
            />
            <div className="overflow-y-auto w-full h-fit  md:-translate-x-1/2 -translate-y-1/2 z-40 bg-[#221612] modal-box modal-scroll fixed top-1/2 left-0 md:left-1/2 p-5 rounded-lg ">
              <button onClick={handleAlbumClose} className=" float-right">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 bg-gradient-to-l from-red-500 to-orange-400 rounded-full"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className=" text-center font-bold text-lg pt-[3rem]">
                {selectedAlbum?.name}
              </h2>
              {/* duration_ms */}
              <ul className=" py-6">
                {data?.albumTracks
                  ?.find((item) => item?.albumId === selectedAlbum?.id)
                  .tracks?.map((track, index) => (
                    <div
                      key={track?.id}
                      className=" flex flex-col md:flex-row justify-between place-content-start md:place-items-center  gap-y-4 "
                    >
                      <li className=" flex gap-x-4 place-items-center pt-5">
                        <span className=" grid place-items-center w-7 h-7 rounded-full items-cent bg-gradient-to-l from-red-500 to-orange-400 ">
                          <p className=" text-gray-50 font-bold text-sm">
                            {index + 1}
                          </p>
                        </span>
                        <h1 className=" font-bold text-sm text-gray-50">
                          {truncateText(track?.name, 30)}
                        </h1>
                      </li>
                      <p className=" hidden md:flex font-bold text-xs text-gray-50">
                        {" "}
                        {converMillisecToMins(track?.duration_ms)}
                      </p>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* ARTIST RELATED ARTISTS */}

      <main className=" py-20">
        {artist_related_artists ? (
          <h1 className=" font-bold  text-base md:text-2xl text-white">
            {" "}
            Similer Artists{" "}
          </h1>
        ) : (
          ""
        )}
        <div className=" grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-6 pt-9">
          {artist_related_artists?.slice(0, 12)?.map((item, index) => (
            <aside key={index}>
              <figure className=" grid place-content-center place-items-center">
                <a href={item?.external_urls?.spotify} target="_blank">
                  <img
                    src={item?.images[2]?.url}
                    alt={item?.name}
                    className=" h-32 w-32 rounded-full object-cover "
                  />
                </a>
              </figure>
              <h1 className=" text-center pt-3 font-semibold text-xs text-gray-200">
                {item.name}
              </h1>
            </aside>
          ))}
        </div>
      </main>
    </section>
  );
};

export default ArtistContainer;
