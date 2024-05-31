<?php
$servidor = "localhost";
$usuario = "inventa1_frigo";
$password = "Ju@n36961464";
$base_datos = "inventa1_balance";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $password, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida - ERROR de conexión: " . $conn->connect_error);
}
echo "Conexión OK";
$sql = 'SELECT * FROM productos';
$datos = mysqli_query($conn, $sql);

  if(mysqli_num_rows($datos) > 0)
  {
   $table = '
    <table border=1>
                     <tr>
                          <th>ID</th>
                          <th>Producto</th>
                          <th>Codigo</th>
                          <th>Codigo1</th>
                          <th>Codigo2</th>
                          <th>Codigo3</th>
                          <th>Codigo4</th>
                          <th>Precio</th>
                     </tr>
   ';
   while($row = mysqli_fetch_array($datos))
   {
    $table .= '
     <tr>
                         <td>'.$row["id"].'</td>
                          <td>'.$row["Producto"].'</td>
                          <td>'.$row["Codigo"].'</td>
                          <td>'.$row["Codigo1"].'</td>
                          <td>'.$row["Codigo2"].'</td>
                          <td>'.$row["Codigo3"].'</td>
                          <td>'.$row["Codigo4"].'</td>
                          <td>'.$row["Precio"].'</td>
 
                     </tr>
    ';
   }
   $table .= '</table>';
   echo $table;
  }
?>