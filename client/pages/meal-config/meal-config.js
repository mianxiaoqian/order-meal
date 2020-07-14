const {globalData} = getApp()
Page({
  data: {
    mealList: []
  },
  onLoad () {
    this.setData({
      mealList: globalData.menuList // 测试感觉是直接引用
    })
  }
})