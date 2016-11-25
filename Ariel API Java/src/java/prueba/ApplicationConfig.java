/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package prueba;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author Ari
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(ABMservices.ForgotPasswordResource.class);
        resources.add(ABMservices.LoginResource.class);
        resources.add(ABMservices.RegisterResource.class);
        resources.add(DonacionesServices.AddResultadoResource.class);
        resources.add(DonacionesServices.CrearDonacionResource.class);
        resources.add(DonacionesServices.DonacionGuardarEstadoResource.class);
        resources.add(DonacionesServices.DonacionesConcretadasResource.class);
        resources.add(DonacionesServices.DonacionesPorNecResource.class);
        resources.add(DonacionesServices.EditResultadoResource.class);
        resources.add(DonacionesServices.VerResultadoResource.class);
        resources.add(Extras.CargaImagenResource.class);
        resources.add(Extras.CargarVideos2Resource.class);
        resources.add(Extras.CargarVideosResource.class);
        resources.add(Extras.ConfianzaResource.class);
        resources.add(Extras.DeleteNotificacionResource.class);
        resources.add(Extras.MostrarNotificacionesResource.class);
        resources.add(Extras.ObtenerarchivosResource.class);
        resources.add(Extras.VerVideosResource.class);
        resources.add(NecesidadesServices.AddFavResource.class);
        resources.add(NecesidadesServices.AddLikeResource.class);
        resources.add(NecesidadesServices.CantDonacionesEnNecResource.class);
        resources.add(NecesidadesServices.CommentResource.class);
        resources.add(NecesidadesServices.CrearNecesidadResource.class);
        resources.add(NecesidadesServices.DeleteFavResource.class);
        resources.add(NecesidadesServices.DeleteLikeResource.class);
        resources.add(NecesidadesServices.EditNecesidadResource.class);
        resources.add(NecesidadesServices.EditUsuarioResource.class);
        resources.add(NecesidadesServices.FiltroResource.class);
        resources.add(NecesidadesServices.InfoUsuarioResource.class);
        resources.add(NecesidadesServices.NecesidadInfoResource.class);
        resources.add(NecesidadesServices.NecesidadesHomeResource.class);
        resources.add(NecesidadesServices.NecesidadesPorUsuarioResource.class);
        resources.add(NecesidadesServices.PendientesResource.class);
        resources.add(NecesidadesServices.PruebaResource.class);
        resources.add(NecesidadesServices.ResumenHome2Resource.class);
        resources.add(NecesidadesServices.ResumenHomeResource.class);
        resources.add(NecesidadesServices.VerCategoriasResource.class);
        resources.add(NecesidadesServices.VerFavoritosResource.class);
        resources.add(NecesidadesServices.VerLikesResource.class);
        resources.add(prueba.GenericResource.class);
        resources.add(prueba.PruebaJsonResource.class);
        resources.add(prueba.ServicioResource.class);
    }
    
}
