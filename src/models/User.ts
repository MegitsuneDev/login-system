import { model, Schema } from 'mongoose';

export default model('User', new Schema({
    username: String,
    password: String
}));