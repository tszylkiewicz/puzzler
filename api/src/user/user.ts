import { Schema, Document, Types, model } from 'mongoose';

interface IUser extends Document {
    userName: string,
    email: string
}

const UserSchema: Schema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, 'First name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    }
});

export default model<IUser>('User', UserSchema);