import CryptoJS from "crypto-js";

export const decrypt = (str) =>
  CryptoJS.AES.decrypt(str, process.env.REACT_APP_CIPHER_KEY).toString(
    CryptoJS.enc.Utf8
  );
