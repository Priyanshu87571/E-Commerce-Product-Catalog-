import mongoose from 'mongoose';
const categorySchema=new mongoose.Schema({name:{type:String,required:true,unique:true,trim:true},slug:{type:String,required:true,unique:true,lowercase:true,trim:true},description:{type:String,trim:true,maxlength:300}},{timestamps:true});
export default mongoose.model('Category',categorySchema);
