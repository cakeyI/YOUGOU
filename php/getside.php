<?php

header('Access-Control-Allow-Origin:*');//任意域名访问
header('Access-Control-Allow-Method:POST,GET');//允许的请求方式
include "connect.php";
//获取前端传入的sid
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    //利用sid查找对应的数据，返回给前端。
    $result=$conn->query("select * from list where sid = $sid");
    echo json_encode($result->fetch_assoc());
}