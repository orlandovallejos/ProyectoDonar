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
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("CargarVideos2")
public class CargarVideos2Resource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CargarVideos2Resource
     */
    public CargarVideos2Resource() {
    }

    /**
     * Retrieves representation of an instance of Extras.CargarVideos2Resource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CargarVideos2Resource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
    
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/carga")
    public Response postStrMsg( String vi) throws SQLException {
        Gson gson=new Gson();
        Video video=gson.fromJson(vi, Video.class); 
        String datos[]={video.getUrl(),video.getComentario(),video.getFecha(), video.getUsuario(),video.getId_necesidad(),video.getTitulo()};
        Insert insert=new Insert();
        try{            
            insert.insert("INSERT INTO videos (url,comentario,fecha,usuarios_usuario,necesidades_id_necesidad, titulo) VALUES (?,?,STR_TO_DATE( ?, '%Y-%m-%d'),?,?,?)",datos);     
            insert.cerrarConexion();
        }
        
          catch(SQLException ex){
            insert.cerrarConexion();
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("Carga Video OK")).build();
    }
}
