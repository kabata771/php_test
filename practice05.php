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
    global $numOfUser,$userID;      //�O���[�o����
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
    // �t�@�C����񂪎擾�ł��Ă��Ȃ��ꍇ�͏����𔲂���
    if( !isset( $argFile[$argColum] ) ) return '';

    $finfo = $argFile[$argColum];

    // �t�@�C�������M����Ă��Ȃ��ꍇ�͏����𔲂���
    if( empty( $finfo['tmp_name'] ) ) return '';

    // �t�@�C���A�b�v���[�h���̃G���[�`�F�b�N
    if( strlen( $finfo['tmp_name'] ) > 0 && $finfo['error'] !== UPLOAD_ERR_OK ){
        $reason = '';
        switch( $finfo['error'] ){
            case UPLOAD_ERR_INI_SIZE:
                 $reason = "php.ini��upload_max_filesize�f�B���N�e�B�u�̒l�𒴂��Ă��܂�";
                 break;
            case UPLOAD_ERR_FORM_SIZE:
                 $reason = "HTML�t�H�[���Ŏw�肳�ꂽMAX_FILE_SIZE�𒴂��Ă��܂�";
                 break;
            case UPLOAD_ERR_PARTIAL:
                 $reason = "�ꕔ�݂̂����A�b�v���[�h����Ă��܂���";
                 break;
            case UPLOAD_ERR_NO_FILE:
                 $reason = "�t�@�C���̓A�b�v���[�h����܂���ł���";
                 break;
            case UPLOAD_ERR_NO_TMP_DIR:
                 $reason = "�e���|�����t�H���_������܂���";
                 break;
            case UPLOAD_ERR_CANT_WRITE:
                 $reason = "�f�B�X�N�ւ̏������݂Ɏ��s���܂���";
                 break;
            case UPLOAD_ERR_EXTENSION:
                 $reason = "PHP�̊g�����W���[�����t�@�C���̃A�b�v���[�h�𒆎~���܂���";
                 break;
        }
        throw new Exception( $reason );
    }

    $tmpname = $finfo['tmp_name'];

    // �w�肳�ꂽ�t�@�C�����A�b�v���[�h���ꂽ���̂��`�F�b�N
    if( !is_uploaded_file( $tmpname ) ){
        $reason = '�w�肳�ꂽ�t�@�C����POST�ŃA�b�v���[�h���ꂽ�t�@�C���ł͂���܂���';
        throw new Exception( $reason );
    }

    // �A�b�v���[�h���ꂽ�t�@�C���̉摜�`���`�F�b�N
    $ext = '';
    if( @exif_imagetype( $tmpname ) === IMAGETYPE_JPEG ){
        $ext = '.jpg';
    }
    else if( @exif_imagetype( $tmpname ) === IMAGETYPE_PNG  ){
        $ext = '.png';
    }
    else {
        $reason = '�摜�`�������Ή��ł�';
        throw new Exception( $reason );
    }

    // �A�b�v���[�h���ꂽ�摜�̈ړ�����
    $fname = './images/'.date( 'YmdHis' ).$ext;
    if( !move_uploaded_file( $tmpname, $fname ) ){
        $reason = '�t�@�C���ۑ����ɃG���[���������܂���';
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