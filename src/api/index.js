/*
包含n个接口请求函数的模块
 */
import ajax from "./ajax";

const BASE = '/api';

// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE}/position/${geohash}`);

//2，获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category');

//3，根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax(BASE + '/shops',{longitude,latitude});

//4，获取一次性短信验证码
export const reqSendCode = (phone) => ajax(BASE+ '/sendcode',{phone});

//5，手机号验证码登陆
export const reqMsgLogin = (phone,code)=> ajax(BASE+'/login_sms',{phone,code},'POST');

//5，手机号验证码登陆
export const reqPwdLogin = ({name,pwd,captcha})=> ajax(BASE+'/login_pwd',{name,pwd,captcha},'POST');

//6，获取用户信息
export const reqUser = () => ajax(BASE + '/userinfo');

//7，退出登录
export const reqLogOut = ()=> ajax(BASE + "/logout");
