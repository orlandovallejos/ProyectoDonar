/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ABMservices;

import BD.Insert;
import Extras.Error;
import Extras.Usuario;
import com.google.gson.Gson;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("Register")
public class RegisterResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of RegisterResource
     */
    public RegisterResource() {
    }

    /**
     * Retrieves representation of an instance of ABMservices.RegisterResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{email}&{pass}&{pass2}&{nombre}&{ape}")
    @Produces("application/json")
    public Response getJson(@PathParam("email") String email,@PathParam("pass") String pass,@PathParam("pass2") String pass2,@PathParam("nombre") String nombre,@PathParam("ape") String ape) throws SQLException {
        Gson gson=new Gson();
        if(!pass2.equals(pass)){
            return Response.status(713).build();
            //Error error=new Error("713","Las contraseñas no coinciden");
            //return gson.toJson(error);
        }
        Usuario user=new Usuario(email,pass,nombre,ape," "," "," "," "," ");
        try{
            String validacion=user.validarUsuario();
            if(!("OK".equals(validacion)))
                return Response.status(Integer.parseInt(validacion)).build();
            validacion=user.existenciaUsuario();
            if(!("OK".equals(validacion)))
                return Response.status(Integer.parseInt(validacion)).build();
            Insert insert=new Insert(); 
            String datos[]={email,pass,nombre,ape}; //llenos el array de string para enviarlo junto con la query
            insert.insert("insert into usuarios(usuario,contrasenia,nombre,apellido) values(?,?,?,?)", datos); //envio la query y los datos.Cada uno de los '?' se reemplazara por un dato.en orden
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(user)).build();
    }

    /**
     * PUT method for updating or creating an instance of RegisterResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
