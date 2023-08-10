// // src/middleware/checkTokenMiddleware.js

// import { logoutAndRedirect } from '../slices/AuthSlice';

// let isLoggedOut = false; // Add a flag to track if already logged out

// const checkTokenMiddleware = (store) => (next) => (action) => {
//   const jwtToken = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('jwt='))
//     ?.split('=')[1];

//   if (!jwtToken && !isLoggedOut && action.type !== logoutAndRedirect.type) {
//     isLoggedOut = true; // Set the flag to prevent further dispatches
//     store.dispatch(logoutAndRedirect());
//   }

//   return next(action);
// };

// export default checkTokenMiddleware;
