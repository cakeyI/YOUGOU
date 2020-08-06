<?php


header('Access-Control-Allow-Origin:*');//任意域名访问
header('Access-Control-Allow-Method:POST,GET');//允许的请求方式

include "connect.php";

$result = $conn->query("select * from list");

$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);