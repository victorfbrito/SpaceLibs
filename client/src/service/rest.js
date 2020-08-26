import { axiosInstance } from "~/index";

import Config from "../config/baseurl";

async function request(method, uri, data = {}, headers = {}, extras = {}) {
  if (!headers["Content-Type"]) headers["Content-Type"] = "application/json";
  try {
    console.log("base_url:");
    console.log(`${Config.baseurl}${uri}`);
    const response = await axiosInstance({
      method,
      url: `${Config.baseurl}${uri}`,
      data,
      headers,
      timeout: 200000,
      ...extras,
    });
    if (response && response.data) {
      if (response.data.success) return response.data.data;
      return response.data;
    }
    return response;
  } catch (err) {
    throw err;
  }
}

function publicHeader(header = {}) {
  header["content-type"] = "application/json";

  return header;
}

async function getRest(uri, header) {
  return request("get", uri, {}, header);
}

async function postRest(uri, data, header) {
  return request("post", uri, data, publicHeader(header));
}

async function putRest(uri, data, header) {
  return request("put", uri, data, publicHeader(header));
}

async function deleteRest(uri, data, header) {
  return request("delete", uri, data, publicHeader(header));
}

function authenticatedHeader(header = {}) {
  const auth = JSON.parse(localStorage.auth);
  if (auth) header.Authorization = `Bearer ${auth.token}`;
  console.log("header");
  console.log(header);
  return header;
}

async function getAuthenticated(uri, header, extras) {
  return request("get", uri, {}, authenticatedHeader(header), extras);
}

async function postAuthenticated(uri, data, header) {
  return request("post", uri, data, authenticatedHeader(header));
}

async function putAuthenticated(uri, data, header) {
  return request("put", uri, data, authenticatedHeader(header));
}

async function deleteAuthenticated(uri, data, header) {
  return request("delete", uri, data, authenticatedHeader(header));
}

export default {
  getRest,
  postRest,
  putRest,
  deleteRest,
  getAuthenticated,
  postAuthenticated,
  putAuthenticated,
  deleteAuthenticated,
  authenticatedHeader,
};
