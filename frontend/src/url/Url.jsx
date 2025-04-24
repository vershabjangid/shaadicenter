import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.shaadicenter.org/',
    withCredentials: true
})



export const getCookie = (key) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === key) {
            return decodeURIComponent(cookieValue); // Decodes special characters
        }
    }
    return null; // Return null if cookie not found
};