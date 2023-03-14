$(function () {
    var form = layui.form //调用layui中写的from规则
    var layer = layui.layer //调用layui中layer规则，即弹出的提示框规则
    //创建自定义的from规则

    form.verify({

        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间'
            }
        } //创建一个名为nickname的验证规则，用户识别用户输入的昵称是否属于该规则，lay-verify是填写规则的地方
    })



    initUserInfo();
    //初始化用户的基本信息
    function initUserInfo() {

        $.ajax({

            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);           
                //调用form.val()快速给表单赋值,layui提供了一种方法给表单快速赋值，用lay-filter写在h5上，后面跟赋值表单的名字
                //from。val()里面有两个需要填充的内容，第一个是自己起的赋值的表单的名字，第二个是ajax获取的用户id
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置表单的数据
    $('#btnReset').on('click', function (e) {

        //先阻止表单默认的重置功能，默认的重置，会清空表单的所有内容，我们只想清空后面两项
        e.preventDefault();

        //将用户的数据还原成用户初始的数据，即重新获取填充一遍数据即可
        initUserInfo();
    })


    //监听表单的提交时间
    $(".layui-form").on('submit',function(e){

        //阻止表单的默认提交行为
        e.preventDefault();
        //发起ajax数据请求
        $.ajax({

            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            //将填写的保单数据发送到服务器端进行更新，serialize()方法即拿到表单填充的数据
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息成功')
                }

                layer.msg('更新用户信息成功！')

                //调用父页面（index）中方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            }
        })
    })

})
