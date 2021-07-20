<?php
    $con = mysqli_connect("localhost","root","Nilaydey@4123","panda");
    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Welcome to Write Board</h1>
    <?php
        // $sql = "SELECT * FROM thing;";
        // $result = mysqli_query($conn, sql);
        //     while ($row  = mysqli_fetch_assoc($result)){
        //         echo $row['userid'];
        //     }
        if (!function_exists('mysqli_init') || !extension_loaded('mysqli')) {
            echo 'We don\'t have mysqli!!!';
        } else {
            echo 'Phew we have it!';
        }
        echo("hi");
    ?>
</body>
</html>
