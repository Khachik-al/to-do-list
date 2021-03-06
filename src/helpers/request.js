import { getToken } from "./storage";



export default function request(url, method = 'GET', body) {
    let config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    }
    if (body) {
        config.body = JSON.stringify(body)
    }

    return fetch(url, config)
        .then(async (response) => {
            let res = await response.json();
            if (response.status >= 400 && response.status < 600) {
                if (res.error) {
                    throw res.error
                }
                else {
                    throw new Error('Somthing went wrong');
                }
            }

            return res
        })

}