/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Ari
 */
public class Necesidad {
    private String id_necesidad;
    private String titulo;
    private String necesidad;
    private String fecha_creacion;
    private String fecha_fin;
    private String cant_likes;
    private String cant_favs;
    private String cant_fotos;
    private String telefono;
    private String facebook;
    private String twitter;
    private String usuario;
    private String direccion;
    private String email;
    private String id_resultado;
    private String categoria;
    private String comentarios_cant;
    private String imagen_path;
    private String avatar;
    private String dia_horario; 
    private String dineroTotal;
    private String dineroRecaudado;
    private String usuario_mp;
    private ArrayList<Comentario> lista_coment = new ArrayList<Comentario>();

    

public Necesidad() {
        
        this.titulo = " ";
        this.necesidad = " ";
        this.fecha_creacion = " ";
        this.fecha_fin = " ";
        this.cant_likes = "0";
        this.cant_favs = "0";
        this.cant_fotos = "0";
        this.telefono = " ";
        this.facebook = " ";
        this.twitter = " ";
        this.usuario = " ";
        this.direccion = " ";
        this.email = " ";
        this.comentarios_cant = " ";
        this.imagen_path = " ";
        this.avatar = " ";
        this.dineroTotal = " ";
        this.dineroRecaudado = " ";
        this.usuario_mp = " ";
        this.dia_horario = " ";
    }    
    
    //este constructor se utiliza para el servicio necesidadesHome
    public Necesidad(String id_necesidad,String titulo, String necesidad, String fecha_creacion, String cant_likes, String comentarios, String imagen_path) {
        this.id_necesidad=id_necesidad;
        this.titulo = titulo;
        this.necesidad = necesidad;
        this.fecha_creacion = fecha_creacion;
        this.cant_likes = cant_likes;
        this.comentarios_cant = comentarios;
        this.imagen_path = imagen_path;
        
    }

    
    //este constructor se utiliza para crear una necesidad
    public Necesidad(String titulo, String necesidad, String fecha_creacion, String fecha_fin, String telefono, String facebook, String twitter, String usuario, String direccion, String email, String categoria, String imagen_path, String dineroTotal) {
        this.titulo = titulo;
        this.necesidad = necesidad;
        this.fecha_creacion = fecha_creacion;
        this.fecha_fin = fecha_fin;
        this.telefono = telefono;
        this.facebook = facebook;
        this.twitter = twitter; 
        this.usuario = usuario;
        this.direccion = direccion;
        this.email = email;
        this.categoria = categoria;
        this.imagen_path = imagen_path;
        this.dineroTotal = dineroTotal;
    }

    
    
    
    //este constructor se utiliza para el servicio NecesidadInfo ,deberia ser modificado en el caso de que se agreguen mas datos a la tabla de necesidades
    public Necesidad(String id_necesidad, String titulo, String necesidad, String fecha_creacion, String fecha_fin, String cant_likes,String cant_favs,String dir,String dia_horario,String telefono,String facebook,String twitter, String usuario,String email, String id_resultado, String categoria, String comentarios_cant, String imagen_path,String din_act,String din_total,String user_mp) {
        this.id_necesidad = id_necesidad;
        this.titulo = titulo;
        this.email=email;
        this.dineroTotal=din_total;
        this.dineroRecaudado=din_act;
        this.direccion=dir;
        this.necesidad = necesidad;
        this.fecha_creacion = fecha_creacion;
        this.fecha_fin = fecha_fin;
        this.cant_likes = cant_likes;
        this.cant_favs = cant_favs;
        this.telefono = telefono;
        this.facebook = facebook;
        this.twitter = twitter;
        this.usuario = usuario;
        this.id_resultado = id_resultado;
        this.categoria = categoria;
        this.comentarios_cant = comentarios_cant;
        this.imagen_path = imagen_path;
        this.dia_horario=dia_horario;
        this.usuario_mp=user_mp;
    }

    public String getId_necesidad() {
        return id_necesidad;
    }

    public void setId_necesidad(String id_necesidad) {
        this.id_necesidad = id_necesidad;
    }

    public String getDireccion() {
        return direccion;
    }
    

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getUsuario_mp() {
        return usuario_mp;
    }

    public void setUsuario_mp(String usuario_mp) {
        this.usuario_mp = usuario_mp;
    }

    
    
    public String getDia_horario() {
        return dia_horario;
    }

    public void setDia_horario(String dia_horario) {
        this.dia_horario = dia_horario;
    }

    
    
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDineroTotal() {
        return dineroTotal;
    }

    public void setDineroTotal(String dineroTotal) {
        this.dineroTotal = dineroTotal;
    }

    public String getDineroRecaudado() {
        return dineroRecaudado;
    }

    public void setDineroRecaudado(String dineroRecaudado) {
        this.dineroRecaudado = dineroRecaudado;
    }

 
    
    
    public String getFecha_fin() {
        return fecha_fin;
    }

    
    
    public void setFecha_fin(String fecha_fin) {
        this.fecha_fin = fecha_fin;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    
    
    public String getId_resultado() {
        return id_resultado;
    }

    public void setId_resultado(String id_resultado) {
        this.id_resultado = id_resultado;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getComentarios_cant() {
        return comentarios_cant;
    }

    public void setComentarios_cant(String comentarios_cant) {
        this.comentarios_cant = comentarios_cant;
    }

    public ArrayList<Comentario> getLista_coment() {
        return lista_coment;
    }

    public void setLista_coment(ArrayList<Comentario> lista_coment) {
        this.lista_coment = lista_coment;
    }

    public String getCant_favs() {
        return cant_favs;
    }

    public void setCant_favs(String cant_favs) {
        this.cant_favs = cant_favs;
    }

    public String getCant_fotos() {
        return cant_fotos;
    }

    public void setCant_fotos(String cant_fotos) {
        this.cant_fotos = cant_fotos;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    
    
    
    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public String getCant_likes() {
        return cant_likes;
    }

    public void setCant_likes(String cant_likes) {
        this.cant_likes = cant_likes;
    }

    public String getComentarios() {
        return comentarios_cant;
    }

    public void setComentarios(String comentarios) {
        this.comentarios_cant = comentarios;
    }

    public String getImagen_path() {
        return imagen_path;
    }

    public void setImagen_path(String imagen_path) {
        this.imagen_path = imagen_path;
    }
    
    
    
    public String validarNecesidad(){
        if (getNecesidad() == null) {
            return "720";
        }
        if (getNecesidad().length() > 1000) {
            return "721";
        }
        if (getFecha_creacion() == null) {
            return "723";
        }
        
        if (getUsuario().length() < 1) {
            return "700";
        }
        
        if (getUsuario().length() > 35) {
            return "701";
        }
        
        
        if (getTitulo() == null || getTitulo().length() < 1) {
            return "726";
        }
        if (getTitulo().length() > 25) {
            return "727";
        }
        

        if (getDireccion().length() > 50) {
            return "729";
        }
        if (getTelefono().length() > 13) {
            return "716";
        }
        
        if(!getEmail().isEmpty())
        if (!validateEmail(getEmail())) {
            return "710";
        }
        
        if (getFacebook().length() > 25) {
            return "717";
        }
        
        if (getTwitter().length() > 25) {
            return "718";
        }
        
        if (getDia_horario().length() > 50) {
            return "731";
        }
        
        if (getUsuario_mp().length() > 40) {
            return "732";
        }
        
        if (getDineroTotal().length() > 12) {
            return "733";
        }
        

        return "OK";
    }
    public static boolean validateEmail(String email) {
 
    // Compiles the given regular expression into a pattern.
    String PATTERN_EMAIL = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
            + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
    Pattern pattern = Pattern.compile(PATTERN_EMAIL);
    
    // Match the given input against this pattern
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
 
    }

}
