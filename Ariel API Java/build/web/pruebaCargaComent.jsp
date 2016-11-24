<%-- 
    Document   : pruebaCargaComent
    Created on : 20/10/2016, 22:32:03
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
            <p class="greeting-id">The ID is </p>
            <p>
            </p>    
        </div>
    </body>
</html>

<script>
$(document).ready(function () {
var Comentario = {
    id_necesidad:'1',
    comentario:'este es un comentario de prueba',
    fecha: '1992-05-07',
    usuario:'juan@gmail.com'
};
alert("Holaaaa!!");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/Comment/post1",           
            data: JSON.stringify(Comentario),
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
