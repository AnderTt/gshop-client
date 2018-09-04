export default {
  //购物车食品的总数
  totalCount(state){
    return state.cartFoods.reduce((preCount,food)=>preCount + food.count,0)
  },
  //购物车食品的总价格
  totalPrice(state){
    return state.cartFoods.reduce((preCount,food)=>preCount + food.count*food.price,0)
  }
}
