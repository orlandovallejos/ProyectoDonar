/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Extras;

/**
 *
 * @author PAO
 */
public class Video {
    private String id_video;
    private String url;
    private String comentario;
    private String fecha;
    private String usuario;
    private String id_necesidad;
    private String titulo;
    
public Video(String id_video, String  url, String comentario, String fecha, String  usuario, String id_necesidad, String titulo){
    this.id_video = id_video;
    this.url = url;
    this.comentario = comentario;
    this.fecha = fecha;
    this.usuario = usuario;
    this.id_necesidad = id_necesidad;
    this.titulo = titulo;
}    

    public String getId_video() {
        return id_video;
    }

    public void setId_video(String id_video) {
        this.id_video = id_video;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getId_necesidad() {
        return id_necesidad;
    }

    public void setId_necesidad(String id_necesidad) {
        this.id_necesidad = id_necesidad;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }



}
