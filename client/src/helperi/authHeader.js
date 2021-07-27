export function authHeader() {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      // for Node.js Express back-end
      return {  'x-token': user.token  };
    } else {
      return {};
    }
}