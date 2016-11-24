/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DonacionesServices;

import BD.Insert;
import BD.Select;
import com.google.gson.Gson;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
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
 * @author Erica
 */
@Path("donacionGuardarEstado")
public class DonacionGuardarEstadoResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of DonacionGuardarEstadoResource
     */
    public DonacionGuardarEstadoResource() {
    }

    /**
     * Retrieves representation of an instance of prueba.donacion.DonacionGuardarEstadoResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/donante/{id_donacion}")  // para guardar un estado se recibe como parametro el id de donacion
    @Produces("application/json")
    public Response getJson(@PathParam("id_donacion") String id_donacion) throws SQLException {
        Gson gson=new Gson();
        Insert insert;
        try{
            insert=new Insert();    
            insert.insertSimple("UPDATE `donacion` SET `estado_donante`=1 WHERE `id_donacion`=?",id_donacion);

            // cambia estado si ambos campos son 1

            Select select = new Select();
            ResultSet rs = select.estado_donacion_donatario(id_donacion);
            if(!rs.next())
                return Response.status(711).build();
            String estado_donatario = rs.getString("estado_donatario");
            if("1".equals(estado_donatario))
            {    
                String donatario=rs.getString("usuarios_usuario_donatario");
                String donante=rs.getString("usuarios_usuario_donante");
                insert.insertSimple("UPDATE `donacion` SET `estado`=1 WHERE `id_donacion`=?",id_donacion);
                insert.insertSimple("UPDATE `usuarios` SET confianza=confianza+1 WHERE `usuario`=?",donatario);
                insert.insertSimple("UPDATE `usuarios` SET confianza=confianza+1 WHERE `usuario`=?",donante);
                String datos2[]={rs.getString("aporte_monetario"),rs.getString("necesidades_id_necesidad")};
                insert.insert("UPDATE `necesidades` SET recaudacion_actual=recaudacion_actual+? WHERE `id_necesidad`=?",datos2);
            }
        select.cerrarConexion();
        insert.cerrarConexion();
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        
        return Response.ok(gson.toJson("OK")).build();
    }

    @GET
    @Path("/donatario/{id_donacion}")  // para guardar un estado se recibe como parametro el id de donacion
    @Produces("application/json")
    public Response getJson2(@PathParam("id_donacion") String id_donacion) throws SQLException {
        Gson gson=new Gson();
        Insert insert;
        Select select;
        try{
        insert=new Insert();
        insert.insertSimple("UPDATE `donacion` SET `estado_donatario`=1 WHERE `id_donacion`=?",id_donacion);
                
        // cambia estado si ambos campos son 1
        
        select = new Select();
        ResultSet rs = select.estado_donacion_donante(id_donacion);
        if(!rs.next())
                return Response.status(711).build();
        String estado_donante = rs.getString("estado_donante");
        if("1".equals(estado_donante))
        {    
            String donatario=rs.getString("usuarios_usuario_donatario");
            String donante=rs.getString("usuarios_usuario_donante");
            insert.insertSimple("UPDATE `donacion` SET `estado`=1 WHERE `id_donacion`=?",id_donacion); 
            insert.insertSimple("UPDATE `usuarios` SET confianza=confianza+1 WHERE `usuario`=?",donatario);
            insert.insertSimple("UPDATE `usuarios` SET confianza=confianza+1 WHERE `usuario`=?",donante);
            String datos2[]={rs.getString("aporte_monetario"),rs.getString("necesidades_id_necesidad")};
            insert.insert("UPDATE `necesidades` SET recaudacion_actual=recaudacion_actual+? WHERE `id_necesidad`=?",datos2);
        }
        insert.cerrarConexion();
        select.cerrarConexion();
        }
        catch(SQLException ex){
            return Response.status(714).build();
        }
        
        return Response.ok(gson.toJson("OK")).build();
    }

    /**
     * PUT method for updating or creating an instance of DonacionGuardarEstadoResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
