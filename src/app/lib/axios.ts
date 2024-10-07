import Axios from "axios";

const BASE_URL = "https://moviesapi.ir/api/v1";

export const api = Axios.create({
  baseURL: BASE_URL,
});
