// pages/receiveInfo/receiveInfo.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    array:[],
    oo:''
  },
  
  //点击 已完成按钮 状态改变
  statusChange(e){
    var that = this;
    var o = e.target.dataset.ono;
    this.setData({
         oo: o
    })
   
    //请求更新快递状态
    wx.request({
      url: 'http://api.iazure.me/updateStatus.php', 
      method:'POST',
      data: {
          Ono : that.data.oo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {
        if(res.data.code === 0){
          that.setData({
            array : res.data.data
          })
          wx.showModal({
            title:'订单已完成',
            content:'记得刷新查看状态！',
            showCancel:false
          })
        }else if(res.data.code === 2){
         wx.showModal({
            title:'提示',
            content:'该单已完成！',
            showCancel:false
          })
        }
      },
      fail(res){
        wx.showModal({
          title:'提示',
          content:'网络不在状态！',
          showCancel:false
        })
      }
    })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   * 获取发单详情的接口数据
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://api.iazure.me/receiveInfo.php', 
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: {
        Sno: app.globalData.user,
      },
      success (res) {
        if(res.data.error_code === 0){          
            that.setData({
              array : res.data.data
            })
        }else if(res.data.error_code === 2){ 
          wx.showModal({
            title:'提示',
            content:'暂无接单记录',
            showCancel:false,
            success(res){}
          })
        }
      }
    })
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
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://api.iazure.me/receiveInfo.php', 
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: {
        Sno: app.globalData.user,
      },
      success (res) {
        if(res.data.error_code === 0){          
            that.setData({
              array : res.data.data
            })
        }else if(res.data.error_code === 2){ 
          wx.showModal({
            title:'提示！',
            content:'暂无接单记录',
            showCancel:false,
            success(res){}
          })
        }
      },
      complete: function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
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