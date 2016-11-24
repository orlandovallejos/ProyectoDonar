
<%@page import="BD.Insert"%>
<%@page import="java.lang.String"%>
<%@page import="org.apache.commons.fileupload.FileUploadException"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="java.util.List"%>
<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="java.io.File"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
  <%
        
        //WEB
        //String destinationRealPath =  "/home/tufantas/tomcat/webapps/tufantasia.net/files";//request.getServletContext().getRealPath( destination );
        
        //LOCAL
        String destination = "/files";
        String destinationRealPath =  request.getServletContext().getRealPath( destination );

        Insert consultaInsert; //es para guardar el path de la imagen en la base de datos
String user="";
DiskFileItemFactory factory = new DiskFileItemFactory();
factory.setSizeThreshold(1024); 
factory.setRepository(new File(destinationRealPath));
int bandera=0; //para saber si ingreso una imagen o no
ServletFileUpload upload = new ServletFileUpload(factory);
String datos[]={"",""};

try
{
List<FileItem> partes = upload.parseRequest(request);

for(FileItem item : partes)
    {   
        
        String extension[] = item.getName().toString().split("\\.");
        if(extension.length!=2)
        break; //si extension no tiene dos campos significa que no se envio la imagen,entonces no modifico la base de datos
        bandera=1;
        File file = new File( destinationRealPath, user+"."+extension[1] );
        item.write(file);
        datos[0]=user+"."+extension[1];
        datos[1]=user;
    }
if(bandera==1){
    out.write("El archivo se ha subido correctamente") ;
    //consultaInsert = new Insert();
    //consultaInsert.insert("update usuarios set imagen_path=? where usuario=?",datos);
    }
}
catch(FileUploadException ex){
    out.write("Error al subir archivo "+ex.getMessage());
}

 
%>
    </body>
</html>
