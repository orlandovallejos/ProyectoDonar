/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Select;
import Extras.Usuario;
import com.google.gson.Gson;
import java.sql.ResultSet;
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
@Path("infoUsuario")
public class InfoUsuarioResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of InfoUsuarioResource
     */
    public InfoUsuarioResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.InfoUsuarioResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{user}")
    @Produces("application/json")
    public Response getJson(@PathParam("user") String usuario) throws SQLException{
        Select select=new Select();
        Gson gson=new Gson();
        Usuario user;
        ResultSet rs;
        try{
            rs=select.infoUusario(usuario);
            if(!rs.next()){ //si next da que no hay filas entonces no existe el usuario
                select.cerrarConexion();
                return Response.status(715).build();                
            }
            user=new Usuario(rs.getString("usuario"),rs.getString("contrasenia"),rs.getString("nombre"),rs.getString("apellido"),rs.getString("sexo"),rs.getString("nacionalidad"),rs.getString("residencia"),rs.getString("telefono"),rs.getString("facebook"),rs.getString("twitter"),rs.getString("imagen_path"),rs.getString("fecha_nacimiento"));
            user.setConfianza(Usuario.confianza(rs.getString("usuario")));
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(715).build();
        }
        select.cerrarConexion();
        return Response.ok(gson.toJson(user)).build();
    }

    /**
     * PUT method for updating or creating an instance of InfoUsuarioResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
