// checkUserStatusMiddleware.js
import User from '../models/userModels.js';

const checkUserStatus = async (req, res, next) => {
    const userId = req.user._id;
    console.log(userId);

    try {
        const user = await User.findById(userId);
        
        if (user && user.status) {
            // User is blocked, send a response with an error message
            return res.status(401).json({ error: 'Your account is temporarily blocked' });
        }

        next(); // Proceed with the request
    } catch (error) {
        // Handle any errors that occur while fetching the user's status
        console.error('Error fetching user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default checkUserStatus;
