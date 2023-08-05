import User from "../models/userModels.js";


const fetchAllUsers = async () => {
  try {
    const users = await User.find({}, { name: 1, email: 1, status:1, profileImage:1,_id: 0 });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export { fetchAllUsers };