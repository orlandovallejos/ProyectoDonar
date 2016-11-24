/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Select;
import Extras.Comentario;
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
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("NecesidadInfo")
public class NecesidadInfoResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of NecesidadInfoResource
     */
    public NecesidadInfoResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.NecesidadInfoResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}")
    @Produces("application/json")
    public String getJson(@PathParam("id") String id) throws SQLException {
        Select select=new Select();
        Necesidad nec; //objeto necesidad que se enviara en el return
        ArrayList<Comentario> lista_com;
        Comentario com;//objeto comentario que se incluira en el array list 
        ResultSet rs=select.comentarios(id); //traigo todos los comentarios de esa necesidad
        Gson gson= new Gson();
        lista_com = new ArrayList<Comentario>(); //array de comentarios
        while(rs.next()){ //lleno el array con objetos comentarios
            com=new Comentario(rs.getString("id_comentario"),rs.getString("comentario"),rs.getString("fecha"),rs.getString("positivos"),rs.getString("negativos"),rs.getString("usuarios_usuario"),rs.getString("imagen_path"));
            lista_com.add(com);
        }
        rs=select.necesidadInfo(id);
        if(!rs.next()){ //si por algun motivo la necesidad no esta tiro error 711
            Extras.Error error=new Extras.Error("711","La necesidad no existe");
            select.cerrarConexion();
            return gson.toJson(error);
        }
        
        //creo el objeto necesidad y le agrego el array de comentarios
        nec=new Necesidad(rs.getString("id_necesidad"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("fecha_fin"),rs.getString("cant_likes"),rs.getString("cant_favs"),rs.getString("direccion"),rs.getString("dia_horario"),rs.getString("telefono"),rs.getString("facebook"),rs.getString("twitter"),rs.getString("usuarios_usuario"),rs.getString("email"),rs.getString("resultado_id_resultado"),rs.getString("categorias_nombre_categoria"),rs.getString("comentarios"),rs.getString("imagen_path"),rs.getString("recaudacion_actual"),rs.getString("recaudacion_total"),rs.getString("usuario_mp"));
        nec.setLista_coment(lista_com);
        rs=select.cantFotos(id);//busco cantidad de fotos
        if(!rs.next()){ //si por algun motivo no devuelve resultado tiro error inesperado
            Extras.Error error=new Extras.Error("714","Error inesperado.");
            select.cerrarConexion();
            return gson.toJson(error);
        }
        nec.setCant_fotos(rs.getString("col"));//agrego el atributo can_fotos al objeto
        
        rs=select.avatar(id);//busco avatar
        if(!rs.next()){ //si por algun motivo no devuelve resultado tiro error inesperado
            Extras.Error error=new Extras.Error("714","Error inesperado.");
            select.cerrarConexion();
            return gson.toJson(error);
        }
        nec.setAvatar(rs.getString("imagen_path"));//agrego el atributo avatar al objeto
        
        select.cerrarConexion();//siempre cierro la conexion luego de terminar de usar el resultset
        return gson.toJson(nec);//nuevo metodo para pasar a formato json un objeto
        
    }

    /**
     * PUT method for updating or creating an instance of NecesidadInfoResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
