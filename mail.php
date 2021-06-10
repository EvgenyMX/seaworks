<?php

// $_POST = json_decode(file_get_contents('php://input'), true);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'lib/PHPMAiler/Exception.php';
require 'lib/PHPMAiler/PHPMailer.php';
require 'lib/PHPMAiler/SMTP.php';


$textTitle = '';
$textBody = '';


if ($_POST['theForm'] === 'applicationForm') {
    $textName = 'CP - Анкета';
    $textTitle = 'Новая анкета';
    $textBody = 'Анкета';
    
    $ext = PHPMailer::mb_pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
    $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['file']['name'])) . '.' . $ext;
    move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
}

if ($_POST['theForm'] === 'callBackForm') {
    if ( isset($_POST["first-name"]) && trim($_POST["first-name"]) !== '' ) {
        $name = htmlspecialchars( trim($_POST["first-name"]) );
    }
    if ( isset($_POST["phone"]) && trim($_POST["phone"]) !== '' ) {
        $phone = htmlspecialchars( trim($_POST["phone"]) );
    }
    if ( isset($_POST["position"]) && trim($_POST["position"]) !== '' ) {
        $position = htmlspecialchars( trim($_POST["position"]) );
    }
    $textName = 'CP - Перезвонить';
    $textTitle = 'Перезвоните - ' . $name;
    $textBody = $name . ' просит перезвонить <br> Телефон:' . $phone . '<br> Вопрос: ' . $position;
}

if ($_POST['theForm'] === 'questionForm') { 
    if ( isset($_POST["mesName"]) && trim($_POST["mesName"]) !== '' ) {
        $mesName = htmlspecialchars( trim($_POST["mesName"]) );
    }
    if ( isset($_POST["mesPhone"]) && trim($_POST["mesPhone"]) !== '' ) {
        $mesPhone = htmlspecialchars( trim($_POST["mesPhone"]) );
    }
    if ( isset($_POST["mesMail"]) && trim($_POST["mesMail"]) !== '' ) {
        $mesMail = htmlspecialchars( trim($_POST["mesMail"]) );
    }
    if ( isset($_POST["message"]) && trim($_POST["message"]) !== '' ) {
        $message = htmlspecialchars( trim($_POST["message"]) );
    }
    $textName = 'CP - Вопрос';
    $textTitle = 'Вопрос от ' . $mesName;
    $textBody = $mesName . '<br> Вопрос: '. $message .'<br> Телефон:' . $mesPhone . '<br> Емаил: ' . $mesMail;
}

$mail = new PHPMailer(true);

// Server settings
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->isSMTP();
$mail->CharSet    = 'UTF-8';
$mail->Host       = 'smtp.mail.ru';
$mail->SMTPAuth   = true;
$mail->Username   = '';
$mail->Password   = '';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
$mail->Port       = 465;                                    
//Recipients
$mail->setFrom('', $textName);
$mail->addAddress('');
//Attachments

if ($_FILES['file']) {
    $mail->addAttachment($uploadfile, $_FILES['file']['name']);  
}

//Content
$mail->isHTML(true);
$mail->Subject = $textTitle;
$mail->Body = $textBody;
$mail->send();