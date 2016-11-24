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
@Path("ResumenHome2")
public class ResumenHome2Resource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ResumenHome2Resource
     */
    public ResumenHome2Resource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.ResumenHome2Resource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public Response getJson() throws SQLException {
        List<String> lista_resumen=null;
        lista_resumen = new ArrayList<String>();
        Select select=new Select();
        ResultSet rs,rs2,rs3;
        String resultado;
        Gson gson=new Gson();
        try{
        rs=select.cantDonacionesConc();
        if(!rs.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("743","No hay donaciones concretadas");
            return Response.ok(gson.toJson(error)).build();        
        }
        resultado=rs.getString(1);
        lista_resumen.add(resultado); 
        rs2=select.cantDonacionesNoConc();
        if(!rs2.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("744","No hay donaciones no concretadas");
            return Response.ok(gson.toJson(error)).build();        
        }
        resultado=rs2.getString(1);
        lista_resumen.add(resultado);
        rs3=select.cantDineroDonado();
        if(!rs3.next()){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("745","Monto recaudado nulo");
            return Response.ok(gson.toJson(error)).build();
        }
        resultado=rs3.getString(1);
        lista_resumen.add(resultado);
        }
        catch(SQLException ex){
            select.cerrarConexion();
            return Response.status(714).build();
        }
        select.cerrarConexion();//siempre cierro la conexion luego de terminar de usar el resultset
        return Response.ok(gson.toJson(lista_resumen)).build();//nuevo metodo para pasar a formato json un objeto
        
    }

    /**
     * PUT method for updating or creating an instance of ResumenHome2Resource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
