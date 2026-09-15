import mongoose from 'mongoose';

// 1. Define the Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is Required for Each User"],
            trim: true
        },
        email: { // email1 + pass1, email2+ pass1
            type: String,
            required: true,
            unique: [true, "Email already Exist"],
            lowercase: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        password:
        {
            type: String,
            required: true
        }
    }, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// 2. Compile and Export the Model
const User = mongoose.model('User', userSchema);

export default User;

// User.create([{name:' ',emai })
// name
// email
// passwaord
// role