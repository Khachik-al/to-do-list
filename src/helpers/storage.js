
export const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {
        return JSON.parse(token).jwt
    }
}
export const checkLoginStatus = () => !!localStorage.getItem('token')

