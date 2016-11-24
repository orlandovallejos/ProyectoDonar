/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package NecesidadesServices;

import BD.Select;
import Extras.Necesidad;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
 * @author Erica
 */
@Path("necesidadesPorUsuario")
public class NecesidadesPorUsuarioResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of NecesidadesPorUsuarioResource
     */
    public NecesidadesPorUsuarioResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.NecesidadesPorUsuarioResource
     * @return an instance of java.lang.String
     */
  /*  @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }
*/
    @GET
    @Path("/{user}")
    @Produces("application/json")
    public Response getJson(@PathParam("user") String usuario) throws SQLException {
        Select select=new Select();
        List<Necesidad> lista_nec=null;
        Gson gson= new Gson();
        //usuario = usuario.replace("-", "@");
        try{
            ResultSet rs=select.necesidadesHomePorUsuario(usuario);
            if(!rs.next()){
                select.cerrarConexion();
                return Response.status(711).build();
            }

            lista_nec = new ArrayList<Necesidad>();
            Necesidad nec;
            nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
            lista_nec.add(nec);
            while(rs.next()){
                nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
                lista_nec.add(nec);
            }
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        select.cerrarConexion();
        return Response.ok(gson.toJson(lista_nec)).build();
    }
    /**
     * PUT method for updating or creating an instance of NecesidadesPorUsuarioResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
