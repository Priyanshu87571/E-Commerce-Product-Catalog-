import {asyncHandler} from '../utils/asyncHandler.js';import {success} from '../utils/apiResponse.js';import * as auth from '../services/authService.js';
export const register=asyncHandler(async(req,res)=>success(res,await auth.register(req.body),'Registered successfully',201));
export const login=asyncHandler(async(req,res)=>success(res,await auth.login(req.body),'Logged in successfully'));
export const me=asyncHandler(async(req,res)=>success(res,{user:req.user}));
