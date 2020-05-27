// Base URL
export const baseUrl = 'http://13.94.203.73:1103/api';
import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    document.getElementById("ajax_loader").classList.remove('hidden');
    return config;
}, function (error) {
    // Do something with request error
    document.getElementById("ajax_loader").classList.add('hidden');
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    setTimeout(function () {
        document.getElementById("ajax_loader").classList.add('hidden');
    }, 1000);
    return response;
}, function (error) {
    document.getElementById("ajax_loader").classList.add('hidden');
    // Do something with response error
    return Promise.reject(error);
});
