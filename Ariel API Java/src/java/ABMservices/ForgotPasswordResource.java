/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ABMservices;

import BD.Select;
import Email.EmailUtility;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("ForgotPassword")
public class ForgotPasswordResource {

    @Context
    private UriInfo context;
    /**
     * Creates a new instance of ForgotPasswordResource
     */
    public ForgotPasswordResource() {
    }

    /**
     * Retrieves representation of an instance of ABMservices.ForgotPasswordResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{mail}")
    @Produces("application/json")
    public String getJson(@PathParam("mail") String mail) throws SQLException {
        String host;
    String port;
    String user;
    String pass;
            // reads SMTP server setting from web.xml file
        
        //host = "smtp.gmail.com";
        //port = "587";
        //user = "donar.pass@gmail.com";
        //pass = "equipo111";
        
        host = "mail.soydonar.com";
        port = "8025";
        user = "info@soydonar.com";
        pass = "111Equipo111";
    
        Select seleccion=new Select();
        String datos[]={mail};
        ResultSet r=seleccion.selectContrasenia(datos);
        String content= "Usuario : "+mail+"\n Contraseña: ";
        if(r.next())
          content=content+r.getObject("contrasenia")+"\n\n\nMuchas Gracias\nStaff de Donar";
        
        String recipient = mail.toString();
        String subject = "Recuperación de contraseña- Donar";
        
 
        String resultMessage = "";
 
        try {
            EmailUtility.sendEmail(host, port, user, pass, recipient, subject,
                    content);
            resultMessage = "El email fue enviado de forma exitosa";
        } catch (Exception ex) {
            ex.printStackTrace();
            resultMessage = "Ha ocurrido un error: " + ex.getMessage();
        } 
    
  
    return resultMessage;
    }

    /**
     * PUT method for updating or creating an instance of ForgotPasswordResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
