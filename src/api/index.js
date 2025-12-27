const baseUrl = "https://sukoon-faq.onrender.com/api/";
const headerConfig = {
  Authorization:
    "Bearer 8eef56e86a4d863a33d547da01f057e63aefc8853419a80e50412b127dc7ff2855ab2ad757ecc60952760f2c227609694c7fbf8d97a7ea81f48d0201d63ba39a3ee7e9f52683807d9e49488e9a0051f9127ece4555e14dc46b178a195a3e59c32658546e3955df82bc1188e3769d12879e5ecdd732fa03a2ef954b2f05b94a88",
  "Content-Type": "application/json",
};

export const apiRequest = async (url, data, method) => {
  try {
    const response = await fetch(`${baseUrl + url}`, {
      method,
      headers: headerConfig,
      body: JSON.stringify(data),
    });
    const responseDatas = response.json().then((responsedata) => ({
      status: response.status,
      body: responsedata,
    }));
    return responseDatas;
  } catch (error) {
    return error;
  }
};
export const getapiRequest = async (url, data, method) => {
  try {
    const response = await fetch(`${baseUrl + url}`, {
      method,
      headers: headerConfig,
    });
    const responseDatas = response.json().then((responsedata) => ({
      status: response.status,
      body: responsedata,
    }));
    return responseDatas;
  } catch (error) {
    return error;
  }
};

export const postMethod = async (url, data) => {
  const apiResp = await apiRequest(url, data, "POST");
  return apiResp;
};

export const getMediaDatas = async (params) => {
  const apiResp = await getapiRequest(params, {}, "GET");
  return apiResp;
};
