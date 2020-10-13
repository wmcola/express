// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    array: [],
    code: '',
    complaintsCounts: 0,
    receiveCounts: 0,
    grade: 0
  },
  sendInfo(){
    wx.navigateTo({
      url: '../sendInfo/sendInfo',
    })
  },
  receiveInfo(){
    wx.navigateTo({
      url: '../receiveInfo/receiveInfo',
    })
  },
  userInfo(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  },

  //点击义工学分触发的事件
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
    var app = getApp();
    var that = this;
    //义工学分添加至后台数据库
    wx.request({
      url: 'http://api.iazure.me/grade2.php', 
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: {
        Sno: app.globalData.user.username,
        Grade: that.data.grade
      },
      success(res){}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断是否为学生用户，接单页展示不同
    var app = getApp();
    var that = this;
    wx.request({
      url: 'http://api.iazure.me/isVolunteer.php', 
      method:'POST',
      data: {
          userSno: app.globalData.user.username,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {
        that.setData({
         code: res.data.code
       })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var app = getApp();
    //处理义工学分
    wx.request({
      url: 'http://api.iazure.me/grade.php', 
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: {
        Sno: app.globalData.user.username,
      },
      success (res) { 
        if(res.data.code === 0){          
          that.setData({
            complaintsCounts : res.data.complaintsCounts,
            receiveCounts : res.data.receiveCounts,
          })
        }
        var rc = that.data.receiveCounts;
        var cc = that.data.complaintsCounts;
        var grade = '';
        if(rc/6){
          grade = (Math.floor(rc/6))*0.2;
        }   
        if(cc/3){
          grade -= (Math.floor(cc/3))*0.1;
        }    
        that.setData({
          grade : grade
        })
      },
    })
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
    //处理义工学分
    wx.request({
      url: 'http://api.iazure.me/grade.php', 
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      data: {
        Sno: app.globalData.user.username,
      },
      success (res) { 
        if(res.data.code === 0){          
          that.setData({
            complaintsCounts : res.data.complaintsCounts,
            receiveCounts : res.data.receiveCounts,
          })
        }
        var rc = that.data.receiveCounts;
        var cc = that.data.complaintsCounts;
        var grade = '';
        if(rc/6){
          grade = (Math.floor(rc/6))*0.2;
        }   
        if(cc/3){
          grade -= (Math.floor(cc/3))*0.1;
        }    
        that.setData({
          grade : grade
        })
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

  },
})