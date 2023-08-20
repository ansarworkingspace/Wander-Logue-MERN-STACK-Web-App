// import axios from "axios";
// import jwt_decode from 'jwt-decode'
// import { setCredentials } from '../slices/AuthSlice'; 


// export const createOrGetUser = async (response, dispatch, navigate)=>{
// const decoded = jwt_decode(response.credential)
// const {name,picture,sub,email} = decoded

// const user = {
//     user_id:sub,
//     name:name,
//     email:email,
//     profileImage:picture
// }
// try {
//     const response = await axios.post('http://localhost:4000/api/users/googleAuth', user);
//     console.log('Response from server:', response.data);



//     // Update user authentication status
//     dispatch(setCredentials({ ...response.data }));

//     // Redirect to the desired route
//     navigate('/'); // You can replace '/' with your desired route

//   } catch (error) {
//     console.error('Error sending POST request:', error);
//   }
// }