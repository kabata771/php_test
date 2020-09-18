<?php
$aim01="practice03.php";
$loginStr="ログイン";
require "practice05.php";
if($register==1){
    $aim01="pracice01.php";
	$loginStr="マイページ";
}else{
    $aim01="practice03.php";
    $loginStr="ログイン";
}
//test($_SERVER['REQUEST_URI']);
?>
<html style="font-size:20px;font-family:Roboto,Arial,sans-serif;" >

<head align="justify">
<link rel="stylesheet" href="practice02.css">
<title>Tou Yude</title>
<meta name="description" content="誰もがアーティストになる！素晴らしい動画共有サイト！">
</head>

<body>
<div id="header">
	<a href="practice01.php" >
	<div id="titleLogo">
	<img src="logo.png" width="60px" height="51px"><span id="title">TouYude</span></div>
	</a>
    <a href=<?php echo $aim01 ?>>
        <span class="login"><?php echo $loginStr ?>></span>
    </a>
</div>
    <br />
    <br />
    <div></div>
    <div>
        <form action="practice01.php" method="post">
            <p>アップロードするファイルを選択して下さい。</p>
            <p>
                <input type="file" name="image" accept="image/png,image/jpeg" />
                <input type="submit" value="送信" />
            </p>
        </form>
    </div>
<div>	
	<div align="left" class="movie">
		<p align="justify">
		ここに動画を表示
		</p>
	</div>
	<div class="movieTextBox">	
		<p class="movieTitle">
		ここに動画タイトル
		</p>
		<p class="movieExplanation">
		ここに動画説明文
		</p>
	</div>
	</div>
</body>

</html>