const {globalData} = getApp()
Page({
  data: {
    menuList: [],
    person: [
      {
        checked: true,
        name: '昱晰',
        menu: ['小笼包', '德克士', '麦当劳', '脱骨鸡']
      },
      {
        checked: true,
        name: '舒心',
        menu: ['陕西老碗', '小食札记', '重庆小面', '挑面官']
      },
      {
        checked: true,
        name: '碧云',
        menu: ['花甲', '湖南米粉']
      },
      {
        checked: true,
        name: '喵子',
        menu: ['花甲', '湖南米粉']
      }
    ]
  },
  onLoad() {
    // const selectedMenu = globalData.selectedMenuList.map(item => {
    //   return item.name
    // })
    // const arr = globalData.menuList.map(item => {
    //   if (selectedMenu.includes(item)) {
    //     item.selected = true
    //   } else {
    //     item.selected = false
    //   }
    //   return item
    // })
    this.setData({
      menuList: globalData.menuList // 测试感觉是直接引用
    })
    this.data.person.forEach((item, index) => {
      this.personChangeMenu(index, item)
    })
    this.data.person.length = this.data.person.length + (3 - (this.data.person.length % 3))
    this.data.menuList.length = this.data.menuList.length + (3 - (this.data.menuList.length % 3))
  },
  onConfirm() {
    globalData.selectedMenuList = this.data.menuList.filter(item => {
      return item.selected
    })
    my.navigateTo({
      url: '/pages/random-draw/random-draw'
    });
  },
  // 人员切换
  switchChange (event) {
    const person = event.target.dataset.person
    const index = event.target.dataset.index
    this.data.person[index].checked = !this.data.person[index].checked
    this.setData({
      person: this.data.person
    })
    this.personChangeMenu(index, person)
  },
  personChangeMenu (index, person) {
    // menuList修改
    let arrMenu = this.data.person.filter((item, personIndex) => {
      return index !== personIndex && item.checked
    }).map(item => {
      return item.menu
    })
    let otherPersonMenu = []
    arrMenu.forEach(item => {
      otherPersonMenu = otherPersonMenu.concat(item)
    })
    const arr = this.data.menuList.map(item => {
      // 将当前被操作人员的菜单放开（需考虑是否在其他吃饭人员的不吃列表内）
      if (person.menu.includes(item.name)) {
        this.data.person[index].checked ? item.selected = false : (otherPersonMenu.includes(item.name) ? item.selected = false : item.selected = true)
      }
      return item
    })
    this.setData({
      menuList: arr
    })
  },
  // 菜单选择
  changeItem (event) {
    const index = event.target.dataset.item
    this.data.menuList[index].selected = !this.data.menuList[index].selected
    this.setData({
      menuList: this.data.menuList
    })
  },
  goUserConfig () {
    my.navigateTo({
      url: '/pages/user-config/user-config'
    })
  },
  goMealConfig () {
    my.navigateTo({
      url: '/pages/meal-config/meal-config'
    })
  }
})