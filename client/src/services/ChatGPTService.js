import axios from "axios";

export async function queryChatGPT(query) {
    try {
        const response = await axios.post("http://localhost:3001/ask", {
            "prompt": query
        });
        console.log('Results:', response.data);
        return response.data;
      } catch (error) {
        error = error.response
          ? error.response.data.error
          : "An error occurred.";
        console.error("Error:", error);
        return { "Error": error };
      }
}
