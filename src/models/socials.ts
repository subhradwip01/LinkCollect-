import mongoose, { Schema, Document } from 'mongoose';

interface ISocials extends Document {
    userId:mongoose.Schema.Types.ObjectId;
    name:string;
    url:string;
}