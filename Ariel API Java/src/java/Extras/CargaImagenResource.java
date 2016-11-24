/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import BD.Insert;
import com.sun.jersey.core.header.FormDataContentDisposition;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import static java.lang.System.out;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import javax.xml.ws.handler.MessageContext;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

/**
 * REST Web Service
 *
 * @author Ari
 */
@Path("cargaImagen")
public class CargaImagenResource {

    @Context
    private UriInfo context;

    @Context
    private HttpServletRequest request;
 
    
    /**
     * Creates a new instance of CargaImagenResource
     */
    public CargaImagenResource() {
        
    }

    /**
     * Retrieves representation of an instance of Extras.CargaImagenResource
     * @return an instance of java.lang.String
     */
    @GET
    @Produces("application/json")
    public String getJson(String name)throws IOException, ServletException, SQLException, Exception {
    String input = name;
    String output = "The input you sent is :" + input;
    return output;
        
        
    }

    /**
     * PUT method for updating or creating an instance of CargaImagenResource
     * @param content representation for the resource
     * @return an HTTP response with content of the updated or created resource.
     */
    @PUT
    @Consumes("application/json")
    public void putJson(String content) {
    }
    
    
}


   
