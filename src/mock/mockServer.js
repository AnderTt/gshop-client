/*使用mock.js提供mock数据接口*/
import Mock from 'mockjs';
import data from './data.json'

//goods的mock数据接口
Mock.mock('/goods',{code:0,data:data.goods});
//ratings的mock数据接口
Mock.mock('/ratings',{code:0,data:data.ratings});
//info的mock数据接口
Mock.mock('/info',{code:0,data:data.info});
