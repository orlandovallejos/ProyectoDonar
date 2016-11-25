<%-- 
    Document   : pruebaEditNec
    Created on : 08/09/2016, 12:01:39
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
var Necesidad = {
    id_necesidad:'85',
    titulo:'Necesidad de prueba edit',
    necesidad:'esta es una necesidad de prueba editada',
    fecha_creacion: '1992-05-07',
    fecha_fin: null, //si no tiene fecha de fin mandas esa fecha
    telefono:'1536078453',
    facebook:'null',
    twitter:'null',
    dia_horario:'lunes a viernes de 15 a 18',
    usuario:'juan@gmail.com',
    direccion:'felix burgos,Morón',
    email:'juan@gmail.com',
    categoria:'ropa',
    imagen_path:null,
    usuario_mp:'juanelo67',
    latitud:'-34.66',
    longitud:'-58.66'
};
alert("estoy");
        $.ajax({
            type: 'post',
            url: "http://localhost:8080/API-DONAR/webresources/editNecesidad/edit",           
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