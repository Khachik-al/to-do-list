
export const getToken = () => {
    let token = localStorage.getItem('token')
    if (token) {

    }
}
export const checkLoginStatus = () => !!localStorage.getItem('token')

