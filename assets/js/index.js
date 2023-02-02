$(function(){

    //调用getUserInfo函数，获取用户的基本信息
    getUserInfo();

    
    //点击“退出”，实现后台的退出
    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
       
        //提示用户是否退出，他需要一个提示框，我们的后台主页和登录页面都用layui的框架来写的
        //layui提供了很多方法，包括这次需要的提示框
        //layer不是凭空出来的，需要从h5结构中给导出来  
        layer.confirm('确定退出登录?',{icon: 3, title:'提示'},function(index){

             //1.清空本地存储中的token
             //2.重新跳转到登录页

             localStorage.removeItem('token')
             location.href = '/project-big_event/login.html'

             //关闭confirm的询问框，layui的询问框
             layer.close(index)
        });

    })

})

//获取用户的基本信息
function getUserInfo(){

    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headres 是请求头的配置对象
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            // console.log(res);
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败')
            }

            renderAvatar(res.data)
        },

        //jquery的ajax函数服务器响应有三种方式，成功是一种，失败是一种，还有第三种，complete
        
 
    })
}


//渲染用户的头像
function renderAvatar(user){
     
     //1.获取用户的名称
     var name = user.nickname || user.username;

     //2.设置欢迎的登录用户的用户名（左侧边栏）
     $("#welcome").html('欢迎&nbsp;&nbsp;' + name)

     //3.按需渲染用户的图像，有图片先渲染图片，无图片渲染文字
     if(user.user_pic !==null){
         //渲染图片头像
         $(".layui-nav-img").attr('src','user.user_pic').show()
         $(".text-avatar").hide()
     }else{
         //渲染文本图像
         $(".layui-nav-img").hide();
         var first = name[0].toUpperCase();
         $(".text-avatar").html(first).show();
     }

}

