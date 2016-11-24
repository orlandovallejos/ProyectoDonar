<%-- 
    Document   : prueba
    Created on : 24/05/2016, 00:32:00
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
var Necesidad = {
    titulo:'Ropa para el interior',
    necesidad:'Necesitamos llevar ropa para el interior del pais',
    fecha_creacion: '2016-09-23',
    fecha_fin: '2016-10-02', //si no tiene fecha de fin mandas esa fecha
    telefono:'1536078453',
    facebook:'/ropaParaelInterior',
    twitter:'@ropaPorelInterior',
    usuario:'juan@gmail.com',
    direccion:'San Martin 2232 Moron',
    email:'',
    categoria:'ropa'
};
alert("estoy");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/crearNecesidad/alta",           
            data: JSON.stringify(Necesidad),
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