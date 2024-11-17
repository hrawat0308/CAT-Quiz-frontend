import axios from "axios"

const baseUrl = 'http://localhost:3001';

const axiosRequest = async (endpoint, method, auth, data) => {
    let token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(auth && { 'x-access-token': token })
    }
    const [response] = await Promise.all([
        (
            await axios(baseUrl + endpoint, {
                method: method,
                headers: headers,
                data: data
            })
        )
    ]);
    return response;
}

export default axiosRequest;