import axios from 'axios';
import md5 from 'crypto-js/md5';

const API_URL = "http://api.valantis.store:40000/";
const PASSWORD = "Valantis";

function generateAuthHeader() {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const authToken = md5(`${PASSWORD}_${timestamp}`).toString();
    return authToken;
}

export const callAPI = async (action:string, params:object) => {
    try {
        const response = await axios.post(API_URL, { action, params }, {
            headers: {
                'X-Auth': generateAuthHeader(),
            },
            maxRedirects: 3,
            timeout: 10000
        });
        return response.data;
    } catch (error:any) {
        console.log(error.response ? error.response.data : error.message);
        console.log(error.response?.status, 'status code');

        return null;
    }
};
