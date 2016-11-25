<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <title>prueba</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       
    </head>
    <body>
        <h1>REGISTRATE!</h1>
        <br><br>
        <h2>Ingresa tu imagen de perfil</h2>
        <br>
        <div align="center">
        <table>
        <tr>   
          <form action="actionUploadFile.jsp" method="post" enctype="multipart/form-data"> 
            <input type="file" name="file"/> 
            <br/>
            <br>
            <br>
            <input type="submit" value="Finalizar" /> 
          </form>   
        </tr>
        </table>
        </div>
        <div>
<a href="https://www.mercadopago.com/mla/withdraw" target="_blank" class="balance-withdraw-money">
                                        Retirar dinero
                                    </a>
            </div>
    </body>
</html>