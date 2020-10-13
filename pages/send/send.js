import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Ono : '4234535',
    ReceiveAddress : '南校区五栋',
    Sname : '无名',
    Sphone : '15884213075',
    SendAddress : '南校区快递站',
    Remark : ''
  },
  signUp: function(event) {
    Dialog.alert({
      title: '期待你的加入！',
      message: '1121022808',
    });
  },
  OnoChange(event){
    this.setData({
      Ono: event.detail
    });
  },
  ReceiveAddressChange(event){
    this.setData({
      ReceiveAddress: event.detail
    });
  },
  SnameChange(event){
    this.setData({
      Sname: event.detail
    });
  },
  SphoneChange(event){
    this.setData({
      Sphone: event.detail
    });
  },
  SendAddressChange(event){
    this.setData({
      SendAddress: event.detail
    });
  },
  RemarkChange(event){
    this.setData({
      Remark: event.detail
    });
  },

  //点击确认发单按钮
  sendBtn:function(e){
    var that = this ;
    var app = getApp();
    if(that.data.Ono == ''){
      wx.showModal({
        title:'提示',
        content:'订单号不能为空',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.SendAddress == ''){
      wx.showModal({
        title:'提示',
        content:'取件地址不能为空',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.Sphone == ''){
      wx.showModal({
        title:'提示',
        content:'手机号码不能为空',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.ReceiveAddress == ''){
      wx.showModal({
        title:'提示',
        content:'收件地址不能为空',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.Sphone.length != 11){
      wx.showModal({
        title:'提示',
        content:'手机号码长度需为11位！',
        showCancel:false,
        success(res){}
      })
    }else{
      wx.request({
        url: 'http://api.iazure.me/send.php', 
        method:'POST',
        data: {
            Ono : that.data.Ono,
            ReceiveAddress : that.data.ReceiveAddress,
            Sname : that.data.Sname,
            Sphone : that.data.Sphone,
            SendAddress : that.data.SendAddress,
            Remark : that.data.Remark,
            // sendSno : app.globalData.user.username,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success (res) {
          if(res.data.code === 1){
            wx.showModal({
              title:'提示',
              content:res.data.msg,
              showCancel:false
            })
          }else if(res.data.code === 2){
            wx.showModal({
              title:'提示',
              content:'发单失败',
              showCancel:false
            })
          }else if(res.data.code === -1){
            wx.showModal({
              title:'提示',
              content:'订单号重复',
              showCancel:false
            })
          }else if(res.data.code === 0){
            wx.showModal({
              title:'提示',
              content:'发单成功，可到我的-发单详情查看',
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
    }    
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
