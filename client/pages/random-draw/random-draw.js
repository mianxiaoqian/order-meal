const {globalData} = getApp()
Page({
  data: {
    menuList: [],
    todayselected: '',
    yuxi: ['小笼包', '德克士', '麦当劳', '脱骨鸡'],
    laodu: ['陕西老碗', '小食札记', '重庆小面', '挑面官'],
    biyun: ['花甲'],
  },
  onLoad() {
    this.setData({
      menuList: globalData.selectedMenuList
    })
  },
  toChangeMenu() {
    my.navigateBack();
  },
  selectMeal() {
    const menuLength = this.data.menuList.length;
    const todayselected = Math.floor(Math.random() * menuLength);
    this.setData({
      todayselected: this.data.menuList[todayselected]
    })
    my.confirm({
      title: '亲',
      content: `今天吃--${this.data.todayselected.name}`,
      confirmButtonText: '我知道了',
      cancelButtonText: '重新抽签',
      success: (result) => {
        console.log('成功回调', result)
        // 今天吃饭入库，在第二天抽签时做过滤
        if (!result.confirm) {
          this.selectMeal()
        }
      }
    });
  },
})