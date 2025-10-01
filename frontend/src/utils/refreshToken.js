import { useRefreshTokenMutation } from "../slices/authApiSlice";
import { setCredentials } from "../slices/authSlice";
import { store } from "../store";

let isRefreshing = false;

export const refreshAuthToken = async () => {
  if (isRefreshing) {
    // Wait for the ongoing refresh to complete
    return new Promise((resolve) => {
      const checkRefresh = setInterval(() => {
        if (!isRefreshing) {
          clearInterval(checkRefresh);
          resolve();
        }
      }, 100);
    });
  }

  try {
    isRefreshing = true;
    const refreshTokenMutation = useRefreshTokenMutation();
    const [refresh] = refreshTokenMutation;

    const response = await refresh().unwrap();
    store.dispatch(setCredentials(response));

    return response.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    // Redirect to login or handle logout
    store.dispatch(logout());
    window.location.href = "/login";
    throw error;
  } finally {
    isRefreshing = false;
  }
};
