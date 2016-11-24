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
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("verVideos")
public class VerVideosResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of VerVideosResource
     */
    public VerVideosResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.VerVideosResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response getJson(@PathParam("id") String id) throws SQLException{
        Select select=new Select();
        ArrayList<Video> lista_videos;
        Gson gson= new Gson();
        lista_videos = new ArrayList<Video>(); //array de string que contendra los videos
        Video video;
        try{
            ResultSet rs=select.selectVideos(id); //traigo todas las categorias de esa necesidad
            while(rs.next()){ //lleno el array con los string categorias
                video=new Video(rs.getString("id_video"),rs.getString("url"),rs.getString("comentario"),rs.getString("fecha"),rs.getString("usuarios_usuario"),rs.getString("necesidades_id_necesidad"),rs.getString("titulo"));
                lista_videos.add(video);
            }
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(714).build();
        }
        select.cerrarConexion();
        return Response.ok(gson.toJson(lista_videos)).build();
    }

    /**
     * PUT method for updating or creating an instance of VerVideosResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
