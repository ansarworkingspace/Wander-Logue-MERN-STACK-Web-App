import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


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
        required: true
    },
    profileImage: {
        type: String
    },
    mobile: {
        type: String,
        required: true
    },
    followers: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    following: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    savedTales: {
        type: [Schema.Types.ObjectId],
        required: false
    },
    role: {
        type: String
    },
    status: {
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