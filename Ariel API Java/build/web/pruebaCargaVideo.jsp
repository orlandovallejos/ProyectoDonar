<%-- 
    Document   : pruebaCargaVideo
    Created on : 01-oct-2016
    Author     : PAO
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
        <h1>Hello World!</h1>
    </body>
</html>
<script>
$(document).ready(function () {
var Video = {
    id_video:'001',
    url:'https://youtu.be/ghABkLllJ74',
    comentario:'Este es un comentario de prueba',
    fecha:'2016-09-24',
    usuario:'100',
    id_necesidad:'2',
    titulo:'[PRUEBA] Ladrillos'
};
alert("Holaaaa!!");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/CargarVideos/carga",           
            data: JSON.stringify(Video),
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
