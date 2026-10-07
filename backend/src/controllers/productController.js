import {asyncHandler} from '../utils/asyncHandler.js';import {success} from '../utils/apiResponse.js';import * as service from '../services/productService.js';
export const list=asyncHandler(async(req,res)=>{const r=await service.listProducts(req.query);success(res,r.items,'Products fetched',200,{total:r.total,page:r.page,limit:r.limit,pages:r.pages});});
export const get=asyncHandler(async(req,res)=>{const p=await service.getProduct(req.params.id);if(!p)return res.status(404).json({success:false,message:'Product not found'});success(res,p);});
export const create=asyncHandler(async(req,res)=>success(res,await service.createProduct(req.body),'Product created',201));
export const update=asyncHandler(async(req,res)=>{const p=await service.updateProduct(req.params.id,req.body);if(!p)return res.status(404).json({success:false,message:'Product not found'});success(res,p,'Product updated');});
export const remove=asyncHandler(async(req,res)=>{const p=await service.deleteProduct(req.params.id);if(!p)return res.status(404).json({success:false,message:'Product not found'});success(res,p,'Product archived');});
export const categoryList=asyncHandler(async(req,res)=>success(res,await service.categories(),'Categories fetched'));
