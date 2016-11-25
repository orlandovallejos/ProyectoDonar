/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package DonacionesServices;

import BD.Insert;
import Extras.Resultado;
import com.google.gson.Gson;
import java.sql.SQLException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
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
@Path("editResultado")
public class EditResultadoResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of EditResultadoResource
     */
    public EditResultadoResource() {
    }

    /**
     * Retrieves representation of an instance of DonacionesServices.EditResultadoResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() {
        //TODO return proper representation object
        throw new UnsupportedOperationException();
    }

    /**
     * PUT method for updating or creating an instance of EditResultadoResource
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
    public Response postStrMsg( String resultado) { 
        Gson gson=new Gson();
        Resultado res=gson.fromJson(resultado, Resultado.class); 
        String datos[]={res.getTitulo(),res.getResultado(),res.getFecha(),res.getId()};
        Insert insert=new Insert();
        try{    
            String validacion=res.validarResultado();
            if(!"OK".equals(validacion))
                return Response.status(Integer.parseInt(validacion)).build();
            insert.insert("UPDATE  resultado SET titulo=?, resultado=?,fecha=STR_TO_DATE( ?, '%Y-%m-%d') WHERE id_resultado=?",datos);     
            insert.cerrarConexion();
        }
        catch(SQLException ex){
            insert.cerrarConexion();
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson("Resultado OK")).build();
    }
}
