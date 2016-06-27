/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package prueba;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("servicio")
public class ServicioResource {

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ServicioResource
     */
    public ServicioResource() {
    }

    /**
     * Retrieves representation of an instance of prueba.ServicioResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/xml")
    public String getXml() {
        //TODO return proper representation object
        //throw new UnsupportedOperationException();
        return "<id>45</id>";
    }

    /**
     * PUT method for updating or creating an instance of ServicioResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/xml")
    public void putXml(String content) {
    }
}