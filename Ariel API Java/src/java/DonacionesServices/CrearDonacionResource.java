/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DonacionesServices;

import BD.Insert;
import Extras.Donacion;
import com.google.gson.Gson;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author PAO
 */
@Path("CrearDonacion")
public class CrearDonacionResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of RegistrarDonacionResource
     */
    public CrearDonacionResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.RegistrarDonacionResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of RegistrarDonacionResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/alta")
    public Response postStrMsg( String don) { 
        Gson gson=new Gson();
        Donacion donacion=gson.fromJson(don, Donacion.class); 
        String datos[]={donacion.getDonante(),donacion.getId_necesidad(),donacion.getFecha(), donacion.getAporte_monetario(), donacion.getAporte_donacion(),donacion.getDonatario()};
        Insert insert=new Insert();
        try{    
            if(!donacion.validarDonacion())
                return Response.status(735).build();
            insert.insert("INSERT INTO donacion ( usuarios_usuario_donante, necesidades_id_necesidad,fecha,aporte_monetario,aporte_donacion,usuarios_usuario_donatario) VALUES (?,?,STR_TO_DATE( ?, '%Y-%m-%d'),?,?,?)",datos);     
            insert.cerrarConexion();
        }
        catch(SQLException ex){
            insert.cerrarConexion();
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("Donacion OK")).build();
    }
}
