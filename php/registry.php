<?php

header('Access-Control-Allow-Origin:*');//任意域名访问
header('Access-Control-Allow-Method:POST,GET');//允许的请求方式
include "connect.php";
if(isset($_POST['submit'])){
    $phone=$_POST['phone'];
    $password=$_POST['password1'];
    $checkword=$_POST['password2'];
    echo  $checkword;
    $conn->query("insert registry values(null,'$phone','$password','$checkword',NOW())");

    header('location:http://localhost/YOUGOU/src/login.html');
}

if(isset($_POST['name'])){
    $user=$_POST['name'];
    $result=$conn->query("select * from registry where phone='$user'");
//在结果数组中找是否存在
    if($result->fetch_assoc()){
        echo true;
    }else {
        echo false;
    }
}
