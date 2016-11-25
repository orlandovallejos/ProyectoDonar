/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package NecesidadesServices;

import BD.Select;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author PAO
 */
@Path("CantDonacionesEnNec")
public class CantDonacionesEnNecResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of CantDonacionesEnNecResource
     */
    public CantDonacionesEnNecResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.CantDonacionesEnNecResource
     * @return an instance of java.lang.String
     */
     @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response getJson(@PathParam("id") String id_necesidad) throws SQLException{
        
        Select select=new Select();
        ResultSet rs;
        Gson gson=new Gson();
        String resultado;
        try{
        rs=select.cantDonaciones(id_necesidad);
        if(!rs.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("711","No existe necesidad");
            return Response.ok(gson.toJson(error)).build();
        }
        resultado=rs.getString(1);
            
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(714).build();
        }
        select.cerrarConexion();//siempre cierro la conexion luego de terminar de usar el resultset
        return Response.ok(gson.toJson(resultado)).build();
    }    
    /**
     * PUT method for updating or creating an instance of CantDonacionesEnNecResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
