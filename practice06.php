<?php
require "practice05.php";
$aim06="practice06.php";
if(empty($_POST['adress'])){
    $_POST['adress']=null;
}
$register = $_POST['adress'];
$registerOn=user_id_identification($register);
if($registerOn>=2){
    echo "<p>もう既に登録されたメールアドレスです</p>";
    $urlTrace=6;
}else if($registerOn==1){
    //header( 'Location: practice01.php' ) ;
    //exit;
    $urlTrace=1;
    $numOfUser=$numOfUser+1;
    $userID[$numOfUser]=$_POST['adress'];
    $userPass[$numOfUser]=$_POST['password'];
}
//test($registerOn);
?>
<html>
<head>
<meta http-equiv="content-type" content="text/html;charse=utf-8">
<link rel="stylesheet" href="practice02.css">
<title>
新規登録
</title>
</head>

<body>
<div id="header">
<a href="practice01.php" ><div id="titleLogo"><img src="logo.png" width="60px" height="51px"><span id="title">TouYude</span></div></a>
</div>

<h1 align="center" class="loginTitle">アカウントの登録</h1>
<hr>
<div class="loginBox" >
	<div class="leftBox">
        <form action=practice045.php method="post">
            <table align="center">
                <tr>
                    <th align="left">メールアドレスで新規登録</th>
                </tr>
                <tr>
                    <th>
                        <br />
                    </th>
                </tr>
                <tr>
                    <td>
                        <input type="text" size="50" name="name" placeholder="ユーザー名" />
                    </td>
                </tr>
                <tr>
                    <th align="left" 　font-size="20px">半角も全角もそのまま反映されますのでご注意ください。</th>
                </tr>
                <tr>
                    <th>
                        <br />
                    </th>
                </tr>
                <tr>
                    <td>
                        <input type="text" size="50" name="adress" placeholder="メールアドレス" />
                    </td>
                </tr>
                <tr>
                    <th align="left">
                        <input type="checkbox" />メールアドレスを保持
                    </th>
                </tr>
                <tr>
                    <th>
                        <br />
                    </th>
                </tr>
                <tr>
                    <td>
                        <input type="password" size="50" name="password" placeholder="パスワード" />
                    </td>
                </tr>
                <tr>
                    <th align="left">
                        <input type="checkbox" />パスワードを保持
                    </th>
                </tr>
                <tr>
                    <td>
                        <div align="center">
                            <input type="submit" size="40" value="新規登録" />
                        </div>
                    </td>
                </tr>
            </table>
        </form>
</div>
</div>

</body>

</html>