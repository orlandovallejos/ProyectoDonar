/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package NecesidadesServices;

import BD.Select;
import Extras.Comentario;
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
import javax.ws.rs.core.UriInfo;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("verCategorias")
public class VerCategoriasResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of VerCategoriasResource
     */
    public VerCategoriasResource() {
    }

    /**
     * Retrieves representation of an instance of NecesidadesServices.VerCategoriasResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson() throws SQLException {
        Select select=new Select();
        ArrayList<String> lista_cat;
        Gson gson= new Gson();
        lista_cat = new ArrayList<String>(); //array de string que contendra las cat
        try{
            ResultSet rs=select.selectCategorias(); //traigo todas las categorias de esa necesidad
            while(rs.next()){ //lleno el array con los string categorias
                lista_cat.add(rs.getString("nombre_categoria"));
            }
        }
        catch(SQLException ex){
            select.cerrarConexion();
            Extras.Error error=new Extras.Error("714","Error inesperado.");
            return gson.toJson(error);
        }
        select.cerrarConexion();
        return gson.toJson(lista_cat);
    }

    /**
     * PUT method for updating or creating an instance of VerCategoriasResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
}
