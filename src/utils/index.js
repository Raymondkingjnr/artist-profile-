import axios from "axios";
const clientId = "e3514f386ccf496fb0fc11d9f1f6f7f3";
const clientSecret = "c401c6bf180e4ecba84b1a5d628a0145";

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

export const fetchData = async (artistId) => {
  try {
    const token = await getAccessToken();

    const [artistInfo, albums, topTracks, relatedArtists] = await Promise.all([
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
            album: "album",
          },
        })
        .then((res) => res.data),
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
        .get(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    ]);

    return {
      artistInfo,
      albums,
      topTracks,
      relatedArtists,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
