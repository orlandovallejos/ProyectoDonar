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
@Path("confianza")
public class ConfianzaResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ConfianzaResource
     */
    public ConfianzaResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.ConfianzaResource
     * @return an instance of java.lang.String
     */
    @GET
     @Path("/{user}")  //parametros que vienen en la url
    @Produces("application/json")
    public Response getJson(@PathParam("user") String user)throws SQLException{
        Gson gson=new Gson();
        Select select=new Select();
        String res;
        ResultSet rs;
        try{
           rs=select.confianza(user);
           rs.next();
           res=rs.getString("confianza");
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(res)).build();
    }

    /**
     * PUT method for updating or creating an instance of ConfianzaResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
