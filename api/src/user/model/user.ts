import { Schema, model } from 'mongoose'
import { IDocument } from '../../common/BaseDocument'
import validator from 'validator'

export interface IUser extends IDocument {
    userName: string
    email: string
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
