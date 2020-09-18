<?php
require "practice03.php";
//require "practice05.php";
if($urlTrace==3){
	$aim09="practice03.php";
	$call09="失敗です";
}else if($urlTrace==6){
	$aim09="practice06.php";
	$call09="失敗です";
}else{
	$aim09="practice01.php";
	$call09="成功です";
}
?>
<html>
<head>
<link rel="stylesheet" href="practice02.css">
<title>
マイページ
</title>
</head>
<body>

	<br /><br />
    <p>
        <?php echo $call09 ?>
    </p>
    <a href=<?php echo $aim09 ?>>元のページに戻る</a>

    <?php
	$urlTrace=4;
    ?>
</body>
</html>