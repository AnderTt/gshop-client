export default {
  //购物车食品的总数
  totalCount(state){
    return state.cartFoods.reduce((preCount,food)=>preCount + food.count,0)
  },
  //购物车食品的总价格
  totalPrice(state){
    return state.cartFoods.reduce((prePrice,food)=>prePrice + food.count*food.price,0)
  },
  //总的评论数
  ratingsCount(state){
    return state.ratings.length
  },
  //满意的评论
  positiveRatings(state){
    return state.ratings.reduce((preRating,rating)=>preRating + (rating.rateType===0 ? 1 : 0) , 0 )
  },
  //不满意的评论
  negativeRatings(state,getters){
    return getters.ratingsCount-getters.positiveRatings
  }
}
