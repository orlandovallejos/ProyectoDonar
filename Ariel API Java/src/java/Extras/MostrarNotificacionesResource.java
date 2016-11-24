/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import BD.Select;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("MostrarNotificaciones")
public class MostrarNotificacionesResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of MostrarNotificacionsResource
     */
    public MostrarNotificacionesResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.MostrarNotificacionsResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{user}")
    @Produces("application/json")
    public Response getJson(@PathParam("user") String user) throws SQLException{
        Select select=new Select();
        ArrayList<Notificacion> lista_not;
        Gson gson= new Gson();
        lista_not = new ArrayList<Notificacion>(); //array de string que contendra los videos
        Notificacion not;
        try{
            ResultSet rs=select.selectNotificaciones(user); //traigo todas las categorias de esa necesidad
            while(rs.next()){ //lleno el array con los string categorias
                not=new Notificacion(rs.getString("id_notificacion"),rs.getString("necesidades_id_necesidad"),rs.getString("usuarios_usuario"),rs.getString("descripcion"),rs.getString("estado"));
                lista_not.add(not);
            }
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(714).build();
        }
        select.cerrarConexion();
        return Response.ok(gson.toJson(lista_not)).build();
    }

    /**
     * PUT method for updating or creating an instance of MostrarNotificacionsResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
