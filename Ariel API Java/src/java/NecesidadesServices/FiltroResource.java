/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Insert;
import BD.Select;
import Extras.Comentario;
import Extras.Filtro;
import Extras.Necesidad;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("filtro")
public class FiltroResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of FiltroResource
     */
    public FiltroResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.FiltroResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of FiltroResource
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
    @Path("/Nec")
    public String postStrMsg(String filtro) throws SQLException { //en filtro llega el json con todos los datos
        List<Necesidad> lista_nec=null;
        Select select=new Select();
        Gson gson= new Gson();
        Filtro fil=gson.fromJson(filtro,Filtro.class);//fil es el objeto filtro que contiene toda la info del json
        ResultSet rs=select.busquedaPorFiltro(fil);
        if(!rs.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("711","La necesidad no existe"); //devuelvo 711 si no hay nninguna con ese filtro
            return gson.toJson(error);
        }
        lista_nec = new ArrayList<Necesidad>();
        Necesidad nec;
        nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
        //los pongo con el set para no modificar el constructor que utilizan otros servicios
        nec.setTiene_resultado(Necesidad.tiene_res(rs.getString("id_necesidad")));
        nec.setLatitud(rs.getString("latitud"));
        nec.setFecha_fin(rs.getString("fecha_fin"));
        nec.setLongitud(rs.getString("longitud"));
        lista_nec.add(nec);
        while(rs.next()){
            nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("cant_likes"),rs.getString("comentarios"),rs.getString("imagen_path"));
            nec.setLatitud(rs.getString("latitud"));
            nec.setLongitud(rs.getString("longitud"));
            nec.setFecha_fin(rs.getString("fecha_fin"));
            nec.setTiene_resultado(Necesidad.tiene_res(rs.getString("id_necesidad")));
            lista_nec.add(nec);
        }
        select.cerrarConexion();//siempre cierro la conexion luego de terminar de usar el resultset
        return gson.toJson(lista_nec);//nuevo metodo para pasar a formato json un objeto
    }
}
