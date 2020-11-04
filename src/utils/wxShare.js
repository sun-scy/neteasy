// 设置微信二次分享设置
// 微信分享sdk
import wx from 'weixin-js-sdk';
import axios from 'axios';
import { convertObjToURI } from '@/utils/functions'
import { getToken } from '@/utils/auth-service'
export const SERVER_URL = process.env.ENTERPRISE_URL;
//export const SERVER_URL = process.env.NODE_ENV === 'development' ? 'https://www.rencaiyoujia.com/rcyjplatformc' : 'https://www.rencaiyoujia.com/rcyjplatformc'
export function wxShare(shareUrl) {
    var num = Math.floor(Math.random() * 10 + 1) * 2 + Math.floor(Math.random() * 10 + 1) * 1
    const token = getToken() ? getToken() : '';
    var val = {
        shareUrl: shareUrl,
        t: num
    }

    axios({
        method: "POST",
        contentType: 'application/json',
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
            "token": token,
            "Accept-Language": "zh"
        },
        url: SERVER_URL + "/api/wx/getWechatSign",
        data: convertObjToURI(val)
    }).then(res => {
        console.log(res)
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: '', // 必填，公众号的唯一标识
            timestamp: "", // 必填，生成签名的时间戳
            nonceStr: '', // 必填，生成签名的随机串
            signature: '',// 必填，签名
            jsApiList: [
                "updateAppMessageShareData",
                "updateTimelineShareData"
            ] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            // 分享给微信好友
            wx.updateAppMessageShareData({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                    // 设置成功
                }
            })

            // 分享到朋友圈
            wx.updateTimelineShareData({
                title: '', // 分享标题
                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                success: function () {
                    // 设置成功
                }
            })

        });
    })
}
