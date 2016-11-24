/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package DonacionesServices;

import BD.Select;
import Extras.Donacion;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("donacionesPorNec")
public class DonacionesPorNecResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of DonacionesPorNecResource
     */
    public DonacionesPorNecResource() {
    }

    /**
     * Retrieves representation of an instance of DonacionesServices.DonacionesPorNecResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Response getJson(@PathParam("id") String id) throws SQLException{
        Select select=new Select();
        ResultSet rs;
        Gson gson=new Gson();
        ArrayList<Donacion> lista_don=new ArrayList<Donacion>();
        Donacion donacion;
        try{
            rs=select.donacionesConcPorNec(id);
            if(!rs.next())
                return Response.status(722).build();
            donacion=new Donacion(rs.getString("id_donacion"),rs.getString("usuarios_usuario_donante"), rs.getString("fecha"),rs.getString("aporte_monetario"), rs.getString("aporte_donacion"));
            lista_don.add(donacion);
            while(rs.next())
            {
            donacion=new Donacion(rs.getString("id_donacion"),rs.getString("usuarios_usuario_donante"), rs.getString("fecha"),rs.getString("aporte_monetario"), rs.getString("aporte_donacion"));
                lista_don.add(donacion);
            }
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(lista_don)).build();
    }

    /**
     * PUT method for updating or creating an instance of DonacionesPorNecResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
