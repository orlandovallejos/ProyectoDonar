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
public class Donacion {
    private String id_donacion;
    private String donante;
    private String id_necesidad;
    private String fecha;
    private String estado;
    private String resultado_id_resultado;
    private String aporte_monetario;
    private String donatario;
    private String estado_donante;
    private String estado_donatario;
    private String aporte_donacion;
    private String titulo;
    private String imagen_path;
    private String necesidad;
    private String fecha_creacion;
    private String fecha_fin;

    public Donacion(String id_donacion,String titulo,String nec,String fecha_creacion,String fecha_fin, String usuarios_usuario_donante, String necesidades_id_necesidad, String fecha, String estado, String resultado_id_resultado, String aporte_monetario ,String aporte_donacion, String usuario_usuario_donatario, String estado_donante, String estado_donatario,String imagen_path) {
        this.id_donacion = id_donacion;
        this.donante = usuarios_usuario_donante;
        this.id_necesidad = necesidades_id_necesidad;
        this.fecha = fecha;
        this.estado = estado;
        this.resultado_id_resultado = resultado_id_resultado;
        this.aporte_monetario = aporte_monetario;
        this.donatario = usuario_usuario_donatario;
        this.estado_donante = estado_donante;
        this.estado_donatario = estado_donatario;
        this.aporte_donacion = aporte_donacion;
        this.titulo=titulo;
        this.imagen_path=imagen_path;
        this.necesidad=nec;
        this.fecha_creacion=fecha_creacion;
        this.fecha_fin=fecha_fin;
    }

    public Donacion(String id_don,String donante, String fecha, String aporte_monetario, String aporte_donacion) {
        this.id_donacion=id_don;
        this.donante = donante;
        this.fecha = fecha;
        this.aporte_monetario = aporte_monetario;
        this.aporte_donacion = aporte_donacion;
    }
    
    

    public String getImagen_path() {
        return imagen_path;
    }

    public void setImagen_path(String imagen_path) {
        this.imagen_path = imagen_path;
    }

    public String getNecesidad() {
        return necesidad;
    }

    public void setNecesidad(String necesidad) {
        this.necesidad = necesidad;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }

    public String getFecha_fin() {
        return fecha_fin;
    }

    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    
    
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    
    
    public String getId_donacion() {
        return id_donacion;
    }

    public void setId_donacion(String id_donacion) {
        this.id_donacion = id_donacion;
    }

    public String getAporte_donacion() {
        return aporte_donacion;
    }

    public void setAporte_donacion(String aporte_donacion) {
        this.aporte_donacion = aporte_donacion;
    }

    
    
    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getResultado_id_resultado() {
        return resultado_id_resultado;
    }

    public void setResultado_id_resultado(String resultado_id_resultado) {
        this.resultado_id_resultado = resultado_id_resultado;
    }

    public String getAporte_monetario() {
        return aporte_monetario;
    }

    public void setAporte_monetario(String aporte_monetario) {
        this.aporte_monetario = aporte_monetario;
    }

    public String getDonante() {
        return donante;
    }

    public void setDonante(String donante) {
        this.donante = donante;
    }

    public String getId_necesidad() {
        return id_necesidad;
    }

    public void setId_necesidad(String id_necesidad) {
        this.id_necesidad = id_necesidad;
    }

    public String getDonatario() {
        return donatario;
    }

    public void setDonatario(String donatario) {
        this.donatario = donatario;
    }



    public String getEstado_donante() {
        return estado_donante;
    }

    public void setEstado_donante(String estado_donante) {
        this.estado_donante = estado_donante;
    }

    public String getEstado_donatario() {
        return estado_donatario;
    }

    public void setEstado_donatario(String estado_donatario) {
        this.estado_donatario = estado_donatario;
    }
    
    
    public boolean validarDonacion(){
        if(!getAporte_donacion().isEmpty())
            if(getAporte_donacion().length()> 200)
                return false;
        return true;
    }
    
}
