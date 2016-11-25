/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Insert;
import Extras.Necesidad;
import Extras.Usuario;
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
@Path("editUsuario")
public class EditUsuarioResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of EditUsuarioResource
     */
    public EditUsuarioResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.EditUsuarioResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of EditUsuarioResource
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
    public Response postStrMsg( String user) throws SQLException { //en user llega el json con todos los datos
        Gson gson=new Gson();
        Usuario usuario=gson.fromJson(user, Usuario.class); //con este metodo parseo el gson y lo paso a un objeto usuario
        String datos[]={usuario.getContrasenia(),usuario.getNombre(),usuario.getApellido(),usuario.getSexo(),usuario.getNacionalidad(),usuario.getResidencia(),usuario.getTelefono(),usuario.getFacebook(),usuario.getTwitter(),usuario.getImagen_path(),usuario.getFecha_nacimiento(),usuario.getUsuario()};
        try{
            String validacion=usuario.validarUsuario();
            if(!("OK".equals(validacion)))
                return Response.status(Integer.parseInt(validacion)).build();
            Insert insert=new Insert();
            //insert.insert("INSERT INTO necesidades ( titulo, necesidad,fecha_creacion,fecha_fin,telefono,facebook,twitter,usuarios_usuario,direccion,email,categorias_nombre_categoria,imagen_path,recaudacion_total) VALUES (?,?,STR_TO_DATE( ?, '%Y-%m-%d'),STR_TO_DATE( ?, '%Y-%m-%d'),?,?,?,?,?,?,?,?,?)",datos);
            insert.insert("UPDATE `usuarios` SET `contrasenia`=?,`nombre`=?,`apellido`=?,`sexo`=?,`nacionalidad`=?,`residencia`=?,`telefono`=?,`facebook`=?,`twitter`=?,`imagen_path`=?,`fecha_nacimiento`=STR_TO_DATE( ?, '%Y-%m-%d') WHERE usuario=?",datos);
            insert.cerrarConexion();
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("OK")).build();
    }
}
