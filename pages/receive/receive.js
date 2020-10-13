// pages/receive/receive.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    clientHeight: 0,
    activeName: '1',
    //存放三个校区的发单信息
    arraya:[],
    arrayb: [],
    // arrayc: [],
    //判断三个校区是否有发单
    codeImagea: '',
    codeImageb: '',
    // codeImagec: '',

    buttonDisabled: false,
    modalHidden: true,
    show: false,
    telVolunteer: '',
    oo: '',
    code: ''
  },
  
  telVolunteer:function(e){
    this.setData({
      telVolunteer:e.detail.value
    });
  },

  // 点击我要接单后的触发事件
 showModal:function(e){
     var o = e.target.dataset.ono;
    this.setData({
     modalHidden:!this.data.modalHidden,
     oo: o
    })
   },
   modalBindaconfirm:function(){ 
     var that = this;
     this.setData({
     modalHidden:!this.data.modalHidden,
     show:!this.data.show,
     buttonDisabled:!this.data.buttonDisabled,
    })

    //请求一：将填写的接单人号码传至数据库
    var app = getApp();
    wx.request({
      url: 'http://api.iazure.me/insertPhone.php', 
      method:'POST',
      data: {
          Ono : that.data.oo,
          Phone : that.data.telVolunteer,
          Sno : app.globalData.user.username,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {
      //判断义工联系方式正确与否
       if(res.data[0].code === 1){
         //判断是否接自己的单子
        if(res.data[1].code === 3){
          wx.showModal({
            title:'提示',
            content:'接单成功，可到我的-接单详情查看',
            showCancel:false,
            success(res){}
          })
        }else if(res.data[1].code === -3){
          wx.showModal({
            title:'提示',
            content:'接单失败原因：不可以接自己的发单！',
            showCancel:false,
            success(res){}
          })
         }
       }else if(res.data[0].code === -1){
        wx.showModal({
          title:'提示',
          content:'接单失败原因：与快递员登记表联系方式不匹配！',
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

    //请求二：订单是否被接单
    wx.request({
      url: 'http://api.iazure.me/insertPhone2.php', 
      method:'POST',
      data: {
          Ono : that.data.oo,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {
        if(res.data.code === -2){
          wx.showModal({
            title:'提示',
            content:'该单已被接！可刷新页面后再查阅订单',
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
    })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight 
        });
      }
    })
    //判断是否为学生用户，接单页展示不同
    var app = getApp();
    var that=this
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //校区的发单详情
    var that = this;
    wx.request({
      url: 'http://api.iazure.me/receive.php', 
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {   
        //成都校区信息
        if(res.data[0].error_code === 1){          
            that.setData({
              arraya : res.data[0].data,
              codeImagea : res.data[0].error_code
            })
        }else if(res.data[0].error_code === 2){
          that.setData({
            codeImagea : res.data[0].error_code
          })
        }
        //眉山校区信息
        if(res.data[1].error_code === 3){          
          that.setData({
            arrayb : res.data[1].data,
            codeImageb : res.data[1].error_code
          })
        }else if(res.data[1].error_code === 4){
          that.setData({
            codeImageb : res.data[1].error_code
          })
        }
        // //其他校区信息
        // if(res.data[2].error_code === 5){          
        //   that.setData({
        //     arrayc : res.data[2].data,
        //     codeImagec : res.data[2].error_code
        //   })
        // }else if(res.data[2].error_code === 6){
        //   that.setData({
        //     codeImagec : res.data[2].error_code
        //   })
        // }
      }
    })
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
    wx.request({
      url: 'http://api.iazure.me/receive.php', 
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success (res) {   
        if(res.data[0].error_code === 1){          
            that.setData({
              arraya : res.data[0].data,
              codeImagea : res.data[0].error_code
            })
        }else if(res.data[0].error_code === 2){
          that.setData({
            codeImagea : res.data[0].error_code
          })
        }
        if(res.data[1].error_code === 3){          
          that.setData({
            arrayb : res.data[1].data,
            codeImageb : res.data[1].error_code
          })
        }else if(res.data[1].error_code === 4){
          that.setData({
            codeImageb : res.data[1].error_code
          })
        }
        // if(res.data[2].error_code === 5){          
        //   that.setData({
        //     arrayc : res.data[2].data,
        //     codeImagec : res.data[2].error_code
        //   })
        // }else if(res.data[2].error_code === 6){
        //   that.setData({
        //     codeImagec : res.data[2].error_code
        //   })
        // }
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
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  } ,
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
  onOpen(event) {
    Toast(`展开: ${event.detail}`);
  },
  onClose(event) {
    Toast(`关闭: ${event.detail}`);
  },
})
