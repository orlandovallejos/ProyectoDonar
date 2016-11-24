/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Insert;
import com.google.gson.Gson;
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
@Path("addFav")
public class AddFavResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AddFavResource
     */
    public AddFavResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.AddFavResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}&{user}")  //parametros que vienen en la url
    @Produces("application/json")
    public String getJson(@PathParam("id") String id,@PathParam("user") String user) throws SQLException {
        Insert insert=new Insert();
        String datos[]={user,id};
        Gson gson=new Gson();
       try{
        insert.insert("INSERT INTO favoritos (usuarios_usuario,necesidades_id_necesidad) VALUES (?,?)",datos);
        insert.insertSimple("update necesidades set cant_favs=cant_favs+1 where id_necesidad=?",id);
        insert.cerrarConexion();
       }
       catch (SQLException ex) {
            ex.printStackTrace();
            Extras.Error error=new Extras.Error("714","Error inesperado.");
            return gson.toJson(error);
        }
        return gson.toJson("OK");
    }

    /**
     * PUT method for updating or creating an instance of AddFavResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
