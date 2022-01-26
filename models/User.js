import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    mail: String,
})

const User = mongoose.model('User', userSchema)

export default User;

