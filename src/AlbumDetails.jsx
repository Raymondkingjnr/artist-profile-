import React from "react";

const AlbumDetails = ({ data, handleAlbumClose, selectedAlbum }) => {
  return (
    <div className="modal">
      <button onClick={handleAlbumClose}>Close</button>
      <h2>{selectedAlbum.name} Tracks</h2>
      <ul>
        {data.albumTracks
          .find((item) => item.albumId === selectedAlbum.id)
          .tracks.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default AlbumDetails;
