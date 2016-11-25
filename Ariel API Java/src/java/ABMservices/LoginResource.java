/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ABMservices;

import BD.Select;
import Extras.Usuario;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import static javax.ws.rs.HttpMethod.OPTIONS;
import javax.ws.rs.OPTIONS;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("Login")
public class LoginResource {

    @Context
    private UriInfo context;
   
    /**
     * Creates a new instance of LoginResource
     */
    public LoginResource() {
    }

    /**
     * Retrieves representation of an instance of ABMservices.LoginResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{name}&{pass}")  //parametros que vienen en la url
    @Produces("application/json")
    public Response getJson(@PathParam("name") String user,@PathParam("pass") String pass) throws SQLException { //en esta linea designo el nombbre de las variables de los parametros de la url
        String datos[]={user,pass};
        Gson gson= new Gson();
        ResultSet rs;//obtengo todos los datos para ese usuario y contraseña
        Usuario us; //creacion de objeto usuario para devolver luego al cliente a traves de json
        try{
            Select select=new Select();
            rs=select.simpleSelect(datos);
            if(!rs.next()){ //siempre hay que hacer este metodo para arrancar a leer los datos de la tabla.si esto da null no hay resultado
               select.cerrarConexion(); //cierro conexion siempre despues de terminar de utilizar el ResultSet (rs)
               //Extras.Error error=new Extras.Error("699","El usuario o contraseña son invalidos");
               return Response.status(699).build();
            }
            us = new Usuario(rs.getString("usuario"), rs.getString("contrasenia"),rs.getString("nombre"),rs.getString("apellido"),rs.getString("sexo"),rs.getString("nacionalidad"),rs.getString("residencia"),rs.getString("imagen_path"),rs.getString("fecha_nacimiento"));
            select.cerrarConexion();//cierro conexion siempre despues de terminar de utilizar el ResultSet (rs)
        }
        catch(SQLException ex){
            //Extras.Error error=new Extras.Error("714","Error insesperado");
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(us)).build();
        //TODO return proper representation object
    }

    /**
     * PUT method for updating or creating an instance of LoginResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
    
    
}
