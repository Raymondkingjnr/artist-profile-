import axios from "axios";
const clientId = "e3514f386ccf496fb0fc11d9f1f6f7f3";
const clientSecret = "c401c6bf180e4ecba84b1a5d628a0145";

// const getAccessToken = async () => {
//   const authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//       Authorization:
//         "Basic " + btoa(clientId + ":" + clientSecret).toString("base64"),
//     },
//     form: {
//       grant_type: "client_credentials",
//     },
//     json: true,
//   };

//   try {
//     const response = await axios.post(authOptions.url, null, {
//       headers: authOptions.headers,
//       params: authOptions.form,
//     });

//     const token = response.data.access_token;
//     return token;
//   } catch (error) {
//     console.error("Error getting access token:", error.message);
//     throw error;
//   }
// };

const getAccessToken = async () => {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // Check if access token exists and is not expired
  if (!accessToken || isTokenExpired(accessToken)) {
    // If access token is expired or doesn't exist, try to refresh it
    try {
      accessToken = await refreshAccessToken(refreshToken);
    } catch (error) {
      console.error("Error refreshing access token:", error.message);
      throw error;
    }
  }

  return accessToken;
};

const refreshAccessToken = async (refreshToken) => {
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: clientId,
    }),
  };

  try {
    const body = await fetch(url, payload);
    const response = await body.json();

    // Update the local storage with the new tokens
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("refresh_token", response.refresh_token);

    return response.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    throw error;
  }
};

const isTokenExpired = (token) => {
  return false; // Placeholder, replace with your actual logic
};

export const fetchedata = async () => {
  try {
    const token = getAccessToken();

    console.log(token);
    const response = await axios.get(
      "https://api.spotify.com/v1/artists/3tVQdUvClmAT7URs9V3rsp",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};
