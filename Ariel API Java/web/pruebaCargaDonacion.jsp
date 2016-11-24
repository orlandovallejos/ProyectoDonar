<%-- 
    Document   : pruebaCargaDonacion
    Created on : 11-sep-2016
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
         <div>
            <p class="greeting-id">The ID is </p>
            <p>
            </p>    
        </div>
    </body>
</html>

<script>
$(document).ready(function () {
var Donacion = {
    donante:'paolaservis@yahoo.com',
    id_necesidad:'67',
    fecha:'2000-05-07',
    aporte_monetario:'100',
    aporte_donacion:'',
    donatario:'juan@gmail.com'
};
alert("Holaaaa!!");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/CrearDonacion/alta",           
            data: JSON.stringify(Donacion),
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