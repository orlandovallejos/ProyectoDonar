/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import BD.Select;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * @author Ari
 */
public class Usuario {
   private String usuario;
    private String contrasenia;
    private String nombre;
    private String apellido;
    private String sexo;
    private String nacionalidad;
    private String residencia;
    private String telefono;
    private String facebook;
    private String twitter;
    private String imagen_path;
    private String fecha_nacimiento;
 
    // Must have no-argument constructor
    public Usuario() {
        this.nacionalidad = "";
        this.residencia = "";
        this.sexo = "";
        this.imagen_path = null;
        this.fecha_nacimiento = "";
        this.telefono = "";
        this.facebook = "";
        this.twitter = "";
    }
    
    public Usuario(String user, String pass,String nombre,String ape,String sexo,String nac,String res,String imagen_path,String fecha_nac) {
  this.usuario = user;
        this.contrasenia = pass;
        this.nombre = nombre;
        this.apellido = ape;
        this.sexo = sexo;
        this.nacionalidad = nac;
        this.residencia = res;
        this.imagen_path = imagen_path;
        this.fecha_nacimiento = fecha_nac;
        this.telefono=" ";
        this.twitter=" ";
        this.facebook=" ";
        
    }

    
    //constructor para la info de usuario
    public Usuario(String usuario, String contrasenia, String nombre, String apellido, String sexo, String nacionalidad, String residencia, String telefono, String facebook, String twitter, String imagen_path, String fecha_nacimiento) {
        this.usuario = usuario;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.nacionalidad = nacionalidad;
        this.residencia = residencia;
        this.telefono = telefono;
        this.facebook = facebook;
        this.twitter = twitter;
        this.imagen_path = imagen_path;
        this.fecha_nacimiento = fecha_nacimiento;
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
    
    
    

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }
    
    

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(String nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public String getResidencia() {
        return residencia;
    }

    public void setResidencia(String residencia) {
        this.residencia = residencia;
    }

    public String getImagen_path() {
        return imagen_path;
    }

    public void setImagen_path(String imagen_path) {
        this.imagen_path = imagen_path;
    }

    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(String fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }
   
    
    
    //Notacion necesaria para que el objeto sea devuelto como json al cliente
    
   

    
    public String validarUsuario() throws SQLException{
        if (getUsuario() == null || getUsuario().length() < 1) {
            return "700";
        }
        if (getUsuario().length() > 35) {
        return "701";
        }
        if (getContrasenia() == null || getContrasenia().length() < 1 || getContrasenia().length() > 8) 
            return "703";
       
         if (getNombre() == null || getNombre().length() < 1 || getNombre().length()>20) 
            return "704";
        
         if (getApellido() == null || getApellido().length() < 1 || getApellido().length()>30) 
            return "705";
             
        if (getNacionalidad() == null || getNacionalidad().length() < 1) {
            return "706";
        }
        if (getNacionalidad().length() > 30) {
            return "707";
        }
        if (getResidencia() == null || getResidencia().length() < 1) {
            return "708";
        }
        if (getResidencia().length() > 50) {
            return "709";
        }
    
        if (!validateEmail(getUsuario())) {
            return "710";
        }
        
        if (getTelefono().length() > 13) {
            return "716";
        }
        if (getFacebook().length() > 25) {
            return "717";
        }
        if (getTwitter().length() > 16) {
            return "718";
        }
        if (getFecha_nacimiento().length() > 10){
            return "719";
        }
        return "OK";
    }
    
    public String existenciaUsuario() throws SQLException{
        Select select=new Select();
        ResultSet r=null;
        String datos[]={getUsuario()};
        r=select.selectUsuario(datos);
        if(r.next())
            return "702";
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
