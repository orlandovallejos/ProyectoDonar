/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Extras;

import com.google.gson.Gson;
import java.io.File;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author Erica
 */
@Path("obtenerarchivos")
public class ObtenerarchivosResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ObtenerarchivosResource
     */
    public ObtenerarchivosResource() {
    }

    /**
     * Retrieves representation of an instance of Extras.ObtenerarchivosResource
     * @return an instance of java.lang.String
     */
    @GET
    @Path("/{directorio}")
    @Produces("application/json")
      public String getJson(@PathParam("directorio") String directorio) throws SQLException{
        Gson gson=new Gson();
        ArrayList<String> lista_archivos = new ArrayList<String>();
        directorio = directorio.replace('-', '/');
        String path ="/home/soydonar/public_html/imagenes/"; 
        path=path+directorio;
        //String path="/";
        File folder = new File(path);
        File[] listado = folder.listFiles(); 

        for (int i = 0; i < listado.length; i++)         {

            if (listado[i].isFile())             {
                lista_archivos.add(listado[i].getName());
               
            }

    }
     //   return Response.ok(gson.toJson(lista_archivos)).build();
     return gson.toJson(lista_archivos);
    }

    /**
     * PUT method for updating or creating an instance of ObtenerarchivosResource
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }
}
