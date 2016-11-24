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
<h1>RESTful Web Service - File Upload Example</h1>  
<form id="fo" action="http://localhost:8080/API-DONAR/webresources/crearNec/upload" method="post"
                                               enctype="multipart/form-data">  
 <p>  
   Select a file to Upload to server: <input type="file" name="file" size="60" />  
 </p>  
 <input type="submit" value="Upload File" />  
</form>  
</body>
</html>    

<script src="https://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script>
    $(document).ready(function() {
  $('#fo').submit(submitForm);
});      
 
function submitForm() {
    alert("prueba");
  var file = $('input[name="uploadfile"').get(0).files[0];
 
  var formData = new FormData();
  formData.append('uploadfile', file);
 
  $.ajax({
      url: "http://localhost:8080/API-DONAR/webresources/crearNec/upload",
      type: 'POST',
      xhr: function() {  // Custom XMLHttpRequest
        var myXhr = $.ajaxSettings.xhr();
        return myXhr;
      },
      // beforeSend: beforeSendHandler,
      success: function(data) {
        alert('successfully uploaded file with '+data+' lines');
      },
      // Form data
      data: formData,
      //Options to tell jQuery not to process data or worry about content-type.
      cache: false,
      contentType: false,
      processData: false
    });
}
    </script>