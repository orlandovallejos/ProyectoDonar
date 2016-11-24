<%-- 
    Document   : pruebaEditUser
    Created on : 09/09/2016, 19:58:26
    Author     : Ari
--%>

<%@page import="java.sql.ResultSet"%>
<%@page import="BD.Select"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script type="text/javascript" src="jquery.js"></script>
        <title>JSP Page</title>
    </head>
    <body>
         <div>
            <p class="greeting-id">El resultado es </p>
            <p>
            </p>    
        </div>
    </body>
</html>

<script>
$(document).ready(function () {
var Usuario = {
    usuario:'mgaray@gmail.com',
    contrasenia:'123456',
    nombre:'mary',
    apellido: 'garay',
    sexo: 'masculino', //si no tiene fecha de fin mandas esa fecha
    nacionalidad:'argentina',
    residencia:'moron',
    telefono:'44867832',
    facebook:'/mgary@gmail.com',
    twitter:'@mgaray',
    imagen_path:'juan@gmail.com.jpg',
    fecha_nacimiento:'2019-08-30'
};
alert("estoy");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/editUsuario/edit",           
            data: JSON.stringify(Usuario),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                    $('.greeting-id').append($(data).find("nombre").text());
                    
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("entre en error");
            }
 
        });       
    });
    
</script>