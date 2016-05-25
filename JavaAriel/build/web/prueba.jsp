<%-- 
    Document   : prueba
    Created on : 24/05/2016, 00:32:00
    Author     : Ari
--%>

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
            
        </div>
    </body>
</html>

<script>
$(document).ready(function () {
 
        $.ajax({
            type: 'GET',
            url: "http://localhost:8080/API-DONAR/webresources/servicio",           
            data: "{}",
            contentType: 'application/json; utf-8',
            dataType: 'xml',
            success: function (data) {
                    $('.greeting-id').append($(data).find("id").text());
                    
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("entre en error");
            }
 
        });       
    });
    
</script>