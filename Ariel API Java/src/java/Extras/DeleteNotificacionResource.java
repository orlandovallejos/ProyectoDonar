/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import BD.Insert;
import com.google.gson.Gson;
import java.sql.SQLException;
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
@Path("DeleteNotificacion")
public class DeleteNotificacionResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of DeleteNotificacionResource
     */
    public DeleteNotificacionResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.DeleteNotificacionResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}")  //parametros que vienen en la url
    @Produces("application/json")
    public Response getJson(@PathParam("id") String id) throws SQLException {
        Insert insert=new Insert();
        String datos[]={id};
        Gson gson=new Gson();
       try{
        insert.insert("DELETE FROM notificaciones WHERE id_notificacion=?",datos);
        insert.cerrarConexion();
       }
       catch (SQLException ex) {
            ex.printStackTrace();
            Extras.Error error=new Extras.Error("714","Error inesperado.");
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("OK")).build();
    }

    /**
     * PUT method for updating or creating an instance of DeleteNotificacionResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
