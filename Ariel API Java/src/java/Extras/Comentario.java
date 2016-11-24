/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

/**
 *
 * @author Ari
 */
public class Comentario {
    String id_comentario;
    String id_necesidad;
    String comentario;
    String fecha;
    String pos;
    String neg;
    String usuario;  
    String imagen_path;

    public Comentario(String id_comentario, String comentario, String fecha, String pos, String neg, String usuario, String imagen_path) {
        this.id_comentario = id_comentario;
        this.comentario = comentario;
        this.fecha = fecha;
        this.pos = pos;
        this.neg = neg;
        this.usuario = usuario;
        this.imagen_path=imagen_path;
    }

    public Comentario(String id_necediad,String comentario, String fecha, String usuario) {
        this.id_necesidad=id_necesidad;
        this.comentario = comentario;
        this.fecha = fecha;
        this.usuario = usuario;
    }

    public String getId_necesidad() {
        return id_necesidad;
    }

    public void setId_necesidad(String id_necesidad) {
        this.id_necesidad = id_necesidad;
    }

    public String getImagen_path() {
        return imagen_path;
    }

    public void setImagen_path(String imagen_path) {
        this.imagen_path = imagen_path;
    }

    
    
    public String getId_comentario() {
        return id_comentario;
    }

    public void setId_comentario(String id_comentario) {
        this.id_comentario = id_comentario;
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

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public String getNeg() {
        return neg;
    }

    public void setNeg(String neg) {
        this.neg = neg;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
    
    public boolean validarComentario(){
        if(getComentario().length()>350)
            return false;
        else
            return true;
    }
}


