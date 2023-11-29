import axios from "axios";

export async function fetchShoppingResults(query) {
  try {
    const response = await axios.get("/shopping-results?q=" + query);
    //console.log('Shopping Results:', response.data);
    return response.data;
  } catch (error) {
    error = error.response
      ? error.response.data.error
      : "An error occurred.";
    console.error("Error:", error);
    return { "Error": error };
  }
}
