

import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },

    otp: {
        type: String, // Assuming OTP is a string
      },

    profileImage: {
        type: String
    },
    profileGoogleImage: {
        type: String
    },
    mobile: {
        type: String,
        required: false
    },
    followers: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    following: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    savedTales: [
        {
            blogId: {
                type: Schema.Types.ObjectId,
                ref: 'Blog'
            },
            title: String,
            summary: String,
            createdAt: Date,
            images: [String], // Change 'image' to 'images'
        }
    ],
    role: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
});



userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    
    });
    
    userSchema.methods.matchPassword = async function (enteredPassword){
        return await bcrypt.compare(enteredPassword,this.password)
    }



const User = mongoose.model('User', userSchema);

export default User;