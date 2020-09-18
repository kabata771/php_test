<?php

//definition
$numOfUser = 1;
$userName[100] = 0;
$userID[100] = 0;
$userPass[100] = 0;

$urlTrace=null;
$aim09=null;
//register
//$userName[$numOfUser];//name
//$userID[$numOfUser];//ID
//$userPass[$numOfUser];//password
$userName=[];//name
$userID=[];//ID
$userPass=[];//password

$userName[1]="master";//name
$userID[1]="master";//ID
$userPass[1]="master";//password
if($_SERVER['REQUEST_URI']=="/php_test/practice01.php"){
    $register=null;
}



function user_id_identification($adress){
    global $numOfUser,$userID;      //グローバル化
    //global $userID;
    for($i=1;$i<=$numOfUser;$i++){
        if($adress==$userID[$i] && !empty($adress)){
            return 2;
            break;
        }else{
            return 1;
        }
    }
}

function user_pass_identification($password){
    for($i=1;$i<$numOfUser;$i++){
        if($password==$userPass[$i] && !empty($password)){
            return 2;
            break;
        }else{
            return 1;
        }
    }
}
function register_name($name){
    $userName[$numOfUser]=$name;
}
function register_ID($name){
    $userID[$numOfUser]=$name;
}
function register_pass($name){
    $userPass[$numOfUser]=$name;
}
function file_upload( $argFile, $argColum ){
    // ファイル情報が取得できていない場合は処理を抜ける
    if( !isset( $argFile[$argColum] ) ) return '';

    $finfo = $argFile[$argColum];

    // ファイルが送信されていない場合は処理を抜ける
    if( empty( $finfo['tmp_name'] ) ) return '';

    // ファイルアップロード時のエラーチェック
    if( strlen( $finfo['tmp_name'] ) > 0 && $finfo['error'] !== UPLOAD_ERR_OK ){
        $reason = '';
        switch( $finfo['error'] ){
            case UPLOAD_ERR_INI_SIZE:
                 $reason = "php.iniのupload_max_filesizeディレクティブの値を超えています";
                 break;
            case UPLOAD_ERR_FORM_SIZE:
                 $reason = "HTMLフォームで指定されたMAX_FILE_SIZEを超えています";
                 break;
            case UPLOAD_ERR_PARTIAL:
                 $reason = "一部のみしかアップロードされていません";
                 break;
            case UPLOAD_ERR_NO_FILE:
                 $reason = "ファイルはアップロードされませんでした";
                 break;
            case UPLOAD_ERR_NO_TMP_DIR:
                 $reason = "テンポラリフォルダがありません";
                 break;
            case UPLOAD_ERR_CANT_WRITE:
                 $reason = "ディスクへの書き込みに失敗しました";
                 break;
            case UPLOAD_ERR_EXTENSION:
                 $reason = "PHPの拡張モジュールがファイルのアップロードを中止しました";
                 break;
        }
        throw new Exception( $reason );
    }

    $tmpname = $finfo['tmp_name'];

    // 指定されたファイルがアップロードされたものかチェック
    if( !is_uploaded_file( $tmpname ) ){
        $reason = '指定されたファイルはPOSTでアップロードされたファイルではありません';
        throw new Exception( $reason );
    }

    // アップロードされたファイルの画像形式チェック
    $ext = '';
    if( @exif_imagetype( $tmpname ) === IMAGETYPE_JPEG ){
        $ext = '.jpg';
    }
    else if( @exif_imagetype( $tmpname ) === IMAGETYPE_PNG  ){
        $ext = '.png';
    }
    else {
        $reason = '画像形式が未対応です';
        throw new Exception( $reason );
    }

    // アップロードされた画像の移動処理
    $fname = './images/'.date( 'YmdHis' ).$ext;
    if( !move_uploaded_file( $tmpname, $fname ) ){
        $reason = 'ファイル保存時にエラーが発生しました';
        throw new Exception( $reason );
    }

    return $fname;
}
?>
<html>
<head>

</head>
<body>

</body>
</html>