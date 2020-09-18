<?php
if(!empty($_POST['name'])){
	$adress = $_POST['name'];
}
if(empty($_POST['adress'])){
    $_POST['adress']=null;
    $adress=$_POST['adress'];
}
if(!empty($_POST['password'])){
	$adress = $_POST['password'];
}
require "practice05.php";
?>

<html>

<head>
<meta http-equiv="content-type" content="text/html;charse=utf-8">
<link rel="stylesheet" href="practice02.css">
<title>
ログイン画面
</title>
</head>

<body>
    <script type="text/javascript" src="practice08.js"></script>

<div id="header">
<a href="practice01.php" ><div id="titleLogo"><img src="logo.png" width="60px" height="51px"><span id="title">TouYude</span></div></a>
</div>

<h1 align="center" class="loginTitle">ログイン画面</h1>
<hr>
<div class="loginBox" >

	<div class="leftBox">
        <form action=practice04.php method="post">

            <table align="center">
                <tr>
                    <th align="left">
                        <br />メールアドレスでログイン
                    </th>
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
                            <input type="submit" size="40" value="ログイン" />
                        </div>
                    </td>
                </tr>
            </table>
        </form>
	</div>

	<div class="rightBox">
	<form action="practice01.php"method="post">
		
			<div align="center"><input type="submit" size="40" value="Googleアカウントでログイン"></div>
	</form>
	</div>
</div>
    <div class="regiBtn">
       
            <button onmouseover="regiBtn()" onmouseout="regiBtn()" id="JS01"> 
<a href="practice06.php">
    新規登録はこちら
</a></button>
       
    </div>
    <?php
    $register=1;
    $login = $_POST['adress'];
    $loginOn=user_id_identification($login);
    if($loginOn<2){
        $urlTrace=3;
    }else if($loginOn==2){
        //header( 'Location: practice01.php' ) ;
        //exit;
        echo "<p>exactly</p>";
        $urlTrace=1;
    }
    //test($urlTrace);
    ?>
</body>

</html>