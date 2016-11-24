/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Insert;
import Extras.Necesidad;
import com.google.gson.Gson;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
@Path("editNecesidad")
public class EditNecesidadResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of EditNecesidadResource
     */
    public EditNecesidadResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.EditNecesidadResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of EditNecesidadResource
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
    @Path("/edit")
    public Response postStrMsg( String nec) throws SQLException { //en nec llega el json con todos los datos
        Gson gson=new Gson();
        Necesidad necesidad=gson.fromJson(nec, Necesidad.class); //con este metodo parseo el gson y lo paso a un objeto comentario
        String datos[]={necesidad.getTitulo(),necesidad.getNecesidad(),necesidad.getFecha_fin(),necesidad.getTelefono(),necesidad.getFacebook(),necesidad.getTwitter(),necesidad.getUsuario(),necesidad.getDireccion(),necesidad.getDia_horario(),necesidad.getEmail(),necesidad.getCategoria(),necesidad.getImagen_path(),necesidad.getDineroTotal(),necesidad.getUsuario_mp(),necesidad.getLatitud(),necesidad.getLongitud(),necesidad.getId_necesidad()};
        Insert insert=new Insert();
        //insert.insert("INSERT INTO necesidades ( titulo, necesidad,fecha_creacion,fecha_fin,telefono,facebook,twitter,usuarios_usuario,direccion,email,categorias_nombre_categoria,imagen_path,recaudacion_total) VALUES (?,?,STR_TO_DATE( ?, '%Y-%m-%d'),STR_TO_DATE( ?, '%Y-%m-%d'),?,?,?,?,?,?,?,?,?)",datos);
        try{
            String validacion=necesidad.validarNecesidad();
            if(!("OK".equals(validacion)))
                return Response.status(Integer.parseInt(validacion)).build();
            insert.insert("UPDATE necesidades SET titulo=? , necesidad=? , fecha_fin=STR_TO_DATE( ?, '%Y-%m-%d') , telefono=? , facebook=? , twitter=? , usuarios_usuario=? , direccion=? , dia_horario=? , email=? , categorias_nombre_categoria=? , imagen_path=? , recaudacion_total=? , usuario_mp=? , latitud=? , longitud=? WHERE id_necesidad=?",datos);
            insert.cerrarConexion();
        }
        catch(SQLException ex){
            insert.cerrarConexion();
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("edicion OK")).build();
    }
}
