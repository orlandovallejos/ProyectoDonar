<%-- 
    Document   : pruebaEditResultado
    Created on : 11/10/2016, 13:22:10
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
var resultado = {
    id:'1',
    titulo:'titulo de prueba editado2',
    resultado:'resultado de prueba2',
    fecha:'2016-08-12'
};
alert("estoy");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/editResultado",           
            data: JSON.stringify(resultado),
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