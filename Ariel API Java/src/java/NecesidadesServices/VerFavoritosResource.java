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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("verFavoritos")
public class VerFavoritosResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of VerFavoritosResource
     */
    public VerFavoritosResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.VerFavoritosResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{user}")  //parametros que vienen en la url
    @Produces("application/json")
    public String getJson(@PathParam("user") String user) throws SQLException {
        Select select=new Select();
        List<Necesidad> lista_nec=null;
        Gson gson= new Gson();
        ResultSet rs=select.necesidadesFav(user);
        if(!rs.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("711","La necesidad no existe");
            return gson.toJson(error);
        }
        
        lista_nec = new ArrayList<Necesidad>();
        Necesidad nec;
        nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
        lista_nec.add(nec);
        while(rs.next()){
            nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
            lista_nec.add(nec);
        }
        select.cerrarConexion();//siempre cierro la conexion luego de terminar de usar el resultset
        return gson.toJson(lista_nec);//nuevo metodo para pasar a formato json un objeto
        
    }

    /**
     * PUT method for updating or creating an instance of VerFavoritosResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
