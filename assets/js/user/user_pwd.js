$(function () {

    var form = layui.form    //导入layui中的form，为layui中自带的校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'   ],
        samePwd: function (value) {

            //value用于接收samepwd所在文本框的值
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
        }

    })

    
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/updatepwd',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
          }
        })
      })
     




})