import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  GET_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  reqLogOut,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

export default {
  //1.异步获取address
    async getAddress({commit,state}){
      const {latitude,longitude} = state;
      const geohash = `${longitude},${latitude}`;
      const result = await reqAddress(geohash);
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    },
  //2.异步获取视频分类列表
  async getCategorys({commit}){
    const result = await reqCategorys();
    const categorys = result.data;
    commit(RECEIVE_CATEGORYS,{categorys})
  },
  //2.异步获取商店列表
  async getShops({commit,state}){
    const {latitude,longitude} = state;
    const result = await reqShops(longitude,latitude);
    const shops = result.data;
    commit(RECEIVE_SHOPS,{shops})
  },
  //3.同步保存user
  saveUser({commit},user){
   commit(RECEIVE_USER,{user})
  },
  //4.异步获取用户信息
  async getUser({commit}){
    const result = await reqUser();
    if(result.code===0){
      const user = result.data;
      commit(GET_USER,{user})
    }
  },
  //5.异步退步登录
  async logout({commit}){
      const result = await reqLogOut();
      if(result.code===0){
        commit(RESET_USER)
      }
  },
  //6，获取商店列表
  async getShopGoods({commit}){
    const result = await reqShopGoods()
    if(result.code===0){
      const goods = result.data;
      commit(RECEIVE_GOODS,{goods})
    }
  },
  //7，获取评论列表
  async getShopRatings({commit}){
    const result = await reqShopRatings()
    if(result.code===0){
      const ratings = result.data;
      commit(RECEIVE_RATINGS,{ratings})
    }
  },
  //8，获取商店详情
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      const info = result.data;
      commit(RECEIVE_INFO,{info})
    }
  }
}
