import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqCategorys,
  reqShops
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
  }
}
