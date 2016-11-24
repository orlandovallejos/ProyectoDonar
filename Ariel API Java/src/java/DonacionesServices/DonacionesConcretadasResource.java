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
@Path("DonacionesConcretadas")
public class DonacionesConcretadasResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of DonacionesConcretadasResource
     */
    public DonacionesConcretadasResource() {
    }

    /**
     * Retrieves representation of an instance of DonacionesServices.DonacionesConcretadasResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{user}")
    @Produces("application/json")
    public Response getJson(@PathParam("user") String usuario) throws SQLException{
        Select select=new Select();
        ResultSet rs;
        Gson gson=new Gson();
        ArrayList<Donacion> lista_don=new ArrayList<Donacion>();
        Donacion donacion;
        try{
            rs=select.donacionesConcretadas(usuario);
            if(!rs.next())
                return Response.status(722).build();
            donacion=new Donacion(rs.getString("id_donacion"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("fecha_fin"),rs.getString("usuarios_usuario_donante"),rs.getString("necesidades_id_necesidad"), rs.getString("fecha"), rs.getString("estado"), rs.getString("resultado_id_resultado"),rs.getString("aporte_monetario"), rs.getString("aporte_donacion"),rs.getString("usuarios_usuario_donatario"),rs.getString("estado_donante"),rs.getString("estado_donatario"),rs.getString("imagen_path"));
            lista_don.add(donacion);
            while(rs.next())
            {
                donacion=new Donacion(rs.getString("id_donacion"),rs.getString("titulo"),rs.getString("necesidad"),rs.getString("fecha_creacion"),rs.getString("fecha_fin"),rs.getString("usuarios_usuario_donante"),rs.getString("necesidades_id_necesidad"), rs.getString("fecha"), rs.getString("estado"), rs.getString("resultado_id_resultado"),rs.getString("aporte_monetario"), rs.getString("aporte_donacion"),rs.getString("usuarios_usuario_donatario"),rs.getString("estado_donante"),rs.getString("estado_donatario"),rs.getString("imagen_path"));
                lista_don.add(donacion);
            }
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        return Response.ok(gson.toJson(lista_don)).build();
    }

    /**
     * PUT method for updating or creating an instance of DonacionesConcretadasResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
