import axios from "axios";
const clientId = import.meta.env.VITE_SPOTIFY_CLIENTID;
const clientSecret = import.meta.env.VITE_SPOTIFY_SECURITYID;

const getAccessToken = async () => {
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " + btoa(clientId + ":" + clientSecret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  try {
    const response = await axios.post(authOptions.url, null, {
      headers: authOptions.headers,
      params: authOptions.form,
    });

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Error getting access token:", error.message);
    throw error;
  }
};

//  2YZyLoL8N0Wb9xBt1NhZWg

export const fetchData = async (artistId, albumType = "album") => {
  try {
    const token = await getAccessToken();

    const [artistInfo, albumData, topTracks, relatedArtists] =
      await Promise.all([
        axios
          .get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => res.data),
        axios
          .get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              market: "NG",
              include_groups: albumType,
            },
          })
          .then((res) => res.data.items),
        axios
          .get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              market: "NG",
            },
          })
          .then((res) => res.data),
        axios
          .get(
            `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => res.data),
      ]);

    const albumTracksPromises = albumData.map(async (album) => {
      const albumTracks = await axios
        .get(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            market: "NG",
          },
        })
        .then((res) => res.data);
      return { albumId: album.id, tracks: albumTracks.items };
    });

    const albumTracks = await Promise.all(albumTracksPromises);

    return {
      artistInfo,
      albumData,
      topTracks,
      relatedArtists,
      albumTracks,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export const number_formatter = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }

  return num?.toString();
};

export const converMillisecToMins = (numbers) => {
  const millisecondsNumber = parseInt(numbers, 10);

  // Check if the conversion is successful
  if (isNaN(millisecondsNumber)) {
    return "Invalid input";
  }

  // Calculate minutes and seconds
  const minutes = Math.floor(millisecondsNumber / (60 * 1000));
  const seconds = ((millisecondsNumber % (60 * 1000)) / 1000).toFixed(0);

  // Return the formatted time
  return `${minutes} : ${seconds < 10 ? "0" : ""}${seconds}`;
};

export const searchArtist = async (query) => {
  try {
    if (!query) {
      throw new Error("Search query cannot be empty.");
    }
    const token = await getAccessToken();

    const resp = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "artist",
        market: "NG",
        limit: 6,
      },
    });

    return resp.data.artists.items;
  } catch (error) {
    console.log("error getting artist", error.message);
    throw error;
  }
};

// 0ABk515kENDyATUdpCKVfW
