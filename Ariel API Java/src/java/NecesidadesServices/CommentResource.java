/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Insert;
import BD.Select;
import Extras.Comentario;
import com.google.gson.Gson;
import java.lang.reflect.Type;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import static javax.ws.rs.HttpMethod.POST;
import javax.ws.rs.POST;
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
@Path("Comment")
public class CommentResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CommentResource
     */
    public CommentResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.CommentResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of CommentResource
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
    @Path("/post1")
    public Response postStrMsg( String com) throws SQLException { //en com llega el json con todos los datos
        Gson gson=new Gson();
        Comentario coment=gson.fromJson(com, Comentario.class); //con este metodo parseo el gson y lo paso a un objeto comentario
        String datos[]={coment.getComentario(),coment.getFecha(),coment.getUsuario(),coment.getId_necesidad()};
        Insert insert=new Insert();
        Select select=new Select();
        String imagen_path;
        try{
            if(!coment.validarComentario())
                return Response.status(734).build();
            insert.insert("INSERT INTO comentarios ( comentario, fecha,usuarios_usuario,necesidades_id_necesidad) VALUES (?,STR_TO_DATE( ?, '%Y-%m-%d'),?,?)",datos);
            insert.insertSimple("update necesidades set comentarios=comentarios+1 where id_necesidad=?",coment.getId_necesidad());
            insert.cerrarConexion();
            ResultSet rs=select.imagenUser(coment.getUsuario());
            if(rs.next())
                imagen_path=rs.getString("imagen_path");
            else 
                imagen_path="null";
            select.cerrarConexion();
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(imagen_path)).build();
    }
}
