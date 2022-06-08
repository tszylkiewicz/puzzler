import { Schema, Document, model } from 'mongoose'
import validator from 'validator'

export interface IUser extends Document {
    userName: string
    email: string
    createdAt: Date
    updatedAt: Date
}

const UserSchema: Schema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validator.isEmail, 'Invalid email format'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

export default model<IUser>('User', UserSchema)
