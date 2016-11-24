/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package DonacionesServices;

import BD.Select;
import Extras.Comentario;
import Extras.Resultado;
import Extras.Usuario;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("verResultado")
public class VerResultadoResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of VerResultadoResource
     */
    public VerResultadoResource() {
    }

    /**
     * Retrieves representation of an instance of DonacionesServices.VerResultadoResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{id}")//id de la necesidad
    @Produces("application/json")
    public Response getJson(@PathParam("id") String id) throws SQLException{
        Select select=new Select();
        Gson gson=new Gson();
        Resultado res;
        ResultSet rs;
        ArrayList<String> lista_don = new ArrayList<String>(); //array de comentarios

        try{
            rs=select.selectResultado(id);
            if(!rs.next()){ 
                select.cerrarConexion();
                return Response.status(742).build();                
            }
            res=new Resultado(rs.getString("id_resultado"),rs.getString("titulo"),rs.getString("resultado"),rs.getString("fecha"),rs.getString("necesidades_id_necesidad"));
            
            rs=select.selectDonadores(rs.getString("necesidades_id_necesidad"));
            while(rs.next()){ 
                lista_don.add(rs.getString("usuarios_usuario_donante"));
            }
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(715).build();
        }
        res.setLista_donadores(lista_don);
        select.cerrarConexion();
        return Response.ok(gson.toJson(res)).build();
    }

    /**
     * PUT method for updating or creating an instance of VerResultadoResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
