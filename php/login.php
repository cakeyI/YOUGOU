<?php


header('Access-Control-Allow-Origin:*');//任意域名访问
header('Access-Control-Allow-Method:POST,GET');//允许的请求方式
include "connect.php";
if(isset($_POST['name']) && isset($_POST['pass'])){
    $user = $_POST['name'];
    $pass = $_POST['pass'];
    $result = $conn->query("select * from registry where phone = '$user' and password ='$pass'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
