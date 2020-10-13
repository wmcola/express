// pages/sendInfo/sendInfo.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tip: '',
    buttonDisabled: false,
    modalHidden: true,
    show: false,

    activeName: '1',
    array: [],
    tt:'',
    oo:'',
    ooo:'',
    complaints:''
  },

  //点击 确认收货按钮 快递状态改变
  statusChange(e){
    var that = this;
    var o = e.target.dataset.ono;
    this.setData({
         ooo: o
    })
   
    //请求更新快递状态
    wx.request({
      url: 'http://api.iazure.me/updateGoodsStatus.php', 
      method:'POST',
      data: {
          Ono : that.data.ooo,
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
            title : '订单已确认收货',
            content : '记得刷新查看状态哦！',
            showCancel : false
          })
        }else if(res.data.code === 2){
         wx.showModal({
            title : '提示',
            content : "当快递状态为'等待确认收货'时方可确认收货！",
            showCancel : false
          })
        }
      },
      fail(res){
        wx.showModal({
          title: '提示',
          content: '网络不在状态！',
          showCancel: false
        })
      }
    })
  },
  complaints:function(e){
    this.setData({
      complaints:e.detail.value
    });
  },

  showModal:function(e){   
    var o = e.target.dataset.ono;
    var t = e.target.dataset.telphone;
    this.setData({
      tt:t,
      oo:o,
      modalHidden:!this.data.modalHidden
    })
   },

   modalBindaconfirm:function(){ 
    var that = this;
    this.setData({
     modalHidden:!this.data.modalHidden,
     show:!this.data.show,
     buttonDisabled:!this.data.buttonDisabled,
   })
   //将填写的投诉内容 传到数据库
   wx.request({
     url: 'http://api.iazure.me/insertComplaints.php', 
     method:'POST',
     data: {
         Ono : that.data.oo,
         Phone : that.data.telVolunteer,
         Complaints : that.data.complaints,
     },
     header: {
       'content-type': 'application/x-www-form-urlencoded' 
     },
     success (res) {
      if(res.data.code === 0){
       wx.showModal({
         title:'提示',
         content:'投诉成功！',
         showCancel:false,
         success(res){}
       })
      }else if(res.data.code === 2){
       wx.showModal({
         title:'提示',
         content:'投诉失败！',
         showCancel:false,
         success(res){}
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
   modalBindcancel:function(){
     this.setData({
     modalHidden:!this.data.modalHidden,
     tip:'您点击了【取消】按钮！'
    })
   },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示发单的数据
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://api.iazure.me/sendInfo.php', 
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      method:'POST',
      data: {
          sendSno : app.globalData.user.username,
      },
      success (res) {  
        if(res.data.error_code === 0){
            that.setData({
              array : res.data.data
            })
        }else if(res.data.error_code === 2){
          wx.showModal({
            title:'提示',
            content:'暂无发单记录',
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
    wx.navigateBack({
      //delta: 1
      url:('../my/my')
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://api.iazure.me/sendInfo.php', 
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      method:'POST',
      data: {
          sendSno : app.globalData.user.username,
      },
      success (res) {  
        if(res.data.error_code === 0){
            that.setData({
              array : res.data.data
            })
        }else if(res.data.error_code === 2){
          wx.showModal({
            title:'提示',
            content:'暂无发单记录',
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