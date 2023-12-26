import React from "react";

const ArtistContainer = ({ data, loading }) => {
  const artist_info = data?.artistInfo;
  const artist_album = data?.albums;
  const artist_top_tracks = data?.topTracks;
  const artist_related_artists = data?.relatedArtists;

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  const selectedImageIndex = 2;
  const selectedImageUrl = artist_info?.images[selectedImageIndex].url;

  return (
    <section>
      {/* ARTIST INFO */}
      <main>
        <img
          src={selectedImageUrl}
          alt="artist_img"
          className=" h-52 w-52 rounded-full object-cover"
        />
      </main>
      {/* ARTIST TOP TRACKS */}
      <main></main>
      {/* ARTIST ALBUMS */}
      <main></main>
      {/* ARTIST RELATED ARTISTS */}
      <main></main>
    </section>
  );
};

export default ArtistContainer;
