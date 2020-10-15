// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    isPassword: true
  },

  //获取input框输入的值
  username:function(e){
    this.setData({
      username: e.detail.value
    });
  },
  password:function(e){
    this.setData({
      password: e.detail.value
    });
  },
  changePwd(){
    this.setData({
      isPassword: !this.data.isPassword
    })
  },

  loginBtn(){
    var that = this;
    wx.request({
      url: 'http://api.iazure.me/login.php', 
      method:'POST',
      data: {
          username: that.data.username,
          password: that.data.password
        },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {
        if(res.data.code === 400){
          wx.showModal({
            title:'提示',
            content:'登录失败：账号或密码不存在！',
            showCancel:false,
            success(res){}
          })
        }
        if(res.data.code === 200){
          getApp().globalData.user = res.data.type;
          wx.reLaunch({
            url: '../send/send',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})