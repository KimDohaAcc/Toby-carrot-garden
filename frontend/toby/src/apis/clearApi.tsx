import { api } from "../config/apiConfig";
import { tempToken } from "../config/apiConfig";

export const postClearImage = async (formData) => {
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  return new Promise((resolve, reject) => {
    api
      .request({
        method: "post",
        url: `clear-image`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${tempToken}`,
        },
      })
      .then((res) => {
        resolve(res);
        console.log("업로드 완료");
      })
      .catch((err) => {
        reject(err);
        console.log(err);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
      });
  });
};
