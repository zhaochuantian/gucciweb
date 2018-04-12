<?php
    header("content-type:text/html;charset=utf-8");
    $name = $_POST["name"];        //获取html页面上表单提交过来的数据
    $password = $_POST["password"]; //获取html页面上表单提交过来的数据
    $con = mysql_connect("localhost","root","123456"); //登录数据库
    // if($con){
    //     echo "success";
    // }else{
    //     echo "error";
    //     exit;
    // }
    $con = mysql_select_db("test1801"); //选择表 

    $sqlvalue = "SELECT name FROM login WHERE name='$name'";     //写一个mysql语句   ，在数据库中寻找有没有跟我提交的注册名相同的注册名 如果有则说明用户已经注册
    $isitok = mysql_query($sqlvalue);//这里返回的是一个布尔值                                //执行上一步写的那个mysql语句  
    if (mysql_num_rows($isitok)){                                  //如果检测到已经有了该用户名      不成功     输出  注册失败
        echo "注册失败";
    } else{
        $sql = "INSERT INTO login VALUES('$name','$password');";       //向数据库中添加信息
        $is_ok = mysql_query($sql);
        if($is_ok){
            echo "注册成功";                                       //如果添加信息语句执行成功， 则注册成功
        }else{
            echo "注册失败";                                      //否则注册失败
        }
    }

?>