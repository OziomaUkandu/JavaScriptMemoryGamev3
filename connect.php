<?php
$email = $_POST['email'];
$password = $_POST['password'];


if (!empty($email) || !empty($password)){
    #code..
    $host = "127.0.0.1";
    $dbUsername = "root";
    $dbname = "game";

    // create connection
    $conn = new mysqli($host, $dbUsername, $dbname );

    if (mysqli_connect_error()){
        die('Connect Error('.mysqli_connect_errno(). ')'. mysqli_connect_error());
    } else{
        $SELECT = "SELECT email From register Where email = ? Limit 1";
        $INSERT = "INSERT Into register (email, password) values (?, ?)";

        //Prepare Statement
        $stmt = $conn->prepare($SELECT);
        $stmt ->bind_param("s", $email);
        $stmt ->execute();
        $stmt ->bind_result($email);
        $stmt ->store_result();
        $rnum = $stmt ->num_rows;

        if($rnum==0){
            # code...
            $stmt ->close();

            $stmt = $conn->prepare($INSERT);
            $stmt ->bind_param("ss",$email, $password);
            $stmt ->execute();
            echo "New record inserted successfully";
        } else {
            echo "Someone already registered with that email";
        }
        $stmt->close();
        $conn->close();
    }
} else{
    echo "All fields are required";
    die();
}


