<?php
    header("content-type:text/html;charset=utf-8");
    $name = $_POST["name"];
    $password = $_POST["password"];
    $con = mysql_connect("localhost","root","123456");
    $con = mysql_select_db("test1801");
    $sql = "SELECT * FROM login WHERE name='$name'  AND password='$password'";
    $is_ok = mysql_query($sql);
    if(mysql_num_rows($is_ok)){
        echo "登录成功" ;
    }else{
        $sqlvalue = "SELECT name FROM login WHERE name='$name'";
        $isitok = mysql_query($sqlvalue);
        if (mysql_num_rows($isitok)){
            echo "密码输入错误";
        } else{
            echo "请先注册账户";
        }
    }
?>

