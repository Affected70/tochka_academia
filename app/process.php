<?php
include 'ChromePhp.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

ChromePhp::log('Hello console!');


//Retrieve form data.
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name']	 : $_POST['name'];
// $email = ($_GET['email']) ?$_GET['email'] : $_POST['email'];
$phone_number = ($_GET['phone_number']) ?$_GET['phone_number'] : $_POST['phone_number'];
$comment = ($_GET['comment']) ?$_GET['comment'] : $_POST['comment'];
$directions = ($_GET['directions']) ?$_GET['directions'] : 'undefined';
$mode = $_GET['mode'];
$mail = ($_GET['mail']) ?$_GET['mail'] : $_POST['mail'];
// $rating = ($_GET['rating']) ?$_GET['rating'] : $_POST['rating'];
$config['smtp_charset'] = 'utf-8';	//кодировка сообщений. (windows-1251 или utf-8, итд)

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
// if (!$email) $errors[count($errors)] = 'Please enter your email.';
if (!$comment) $errors[count($errors)] = 'Please enter your comment.';
if (!$directions) $errors[count($errors)] = 'Please enter your comment.';

if (!$phone_number) $errors[count($errors)] = 'Please enter your phone number.';

// $subject = 'Сообщение от ' . $name;

if (isset($mode) && strcmp($mode, 'dir') == 0)
{
	$subject = 'Запись на занятия от ' . $name; 
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
	<table>
	<tr><td>Имя: </td><td>' . $name . '</td></tr>
	<tr><td>Телефон: </td><td>' . $phone_number . '</td></tr>
	<tr><td>Сообщение: </td><td>' . nl2br($comment) . '</td></tr>
	<tr><td>Направления: </td><td>' . nl2br($directions) . '</td></tr>
	</table>
	</body>
	</html>';
}
else
{
	$subject = 'Сообщение от ' . $name;
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
	<table>
	<tr><td>Имя: </td><td>' . $name . '</td></tr>
	<tr><td>Телефон: </td><td>' . $phone_number . '</td></tr>
	<tr><td>Сообщение: </td><td>' . nl2br($comment) . '</td></tr>
	</table>
	</body>
	</html>';
}



$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
try {
    //Server settings
    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.yandex.ru';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'blinari.no-reply@yandex.ru';                 // SMTP username
    $mail->Password = 'Ssirius1';                           // SMTP password
    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('blinari.no-reply@yandex.ru');
    $mail->addAddress('user27971@olivka-tlt.ru', 'user27971');     // Add a recipient
		$mail->CharSet = 'utf-8';

    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body    = $message;

    $mail->send();
    ChromePhp::log('Message has been sent');
    echo 'Message has been sent';
} catch (Exception $e) {
	  ChromePhp::log('Message could not be sent. Mailer Error: ', $mail->ErrorInfo);
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

return 0;

?>