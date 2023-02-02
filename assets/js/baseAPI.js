// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url;
  // console.log(options.url);

  //统一为有权限的接口，设置headers请求头,因為有權限的接口都在/my/下，所以可以先判断是不是/my/开头的目录下

  if(options.url.indexOf('/my/') !== -1){ //indexOf用来判断里面有没有指定的字符
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

   // 全局通知挂在complete回调函数
   options.complete = function(res){
      // console.log("执行了 complete回调");
      // console.log(res);
      //在complete可以使用res.responseJSON拿到服务器响应回来的数据
      if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
         
          //强制清空token 
          localStorage.removeItem('token')
          
          //强制跳转到登录页
          location.href = '/project-big_event/login.html'
      }
   }
})
