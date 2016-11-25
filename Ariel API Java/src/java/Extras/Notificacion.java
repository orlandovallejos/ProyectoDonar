/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import BD.Insert;
import BD.Select;
import Email.EmailUtility;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author Ari
 */
public class Notificacion {
    private String id_notificacion;
    private String necesidades_id_necesidad;
    private String usuarios_usuario;
    private String descripcion;
    private String estado;

    public Notificacion(){
    }
    
    public Notificacion(String id_notificacion, String necesidades_id_necesidad, String usuarios_usuario, String descripcion, String estado) {
        this.id_notificacion = id_notificacion;
        this.necesidades_id_necesidad = necesidades_id_necesidad;
        this.usuarios_usuario = usuarios_usuario;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    public String getId_notificacion() {
        return id_notificacion;
    }

    public void setId_notificacion(String id_notificacion) {
        this.id_notificacion = id_notificacion;
    }

    public String getNecesidades_id_necesidad() {
        return necesidades_id_necesidad;
    }

    public void setNecesidades_id_necesidad(String necesidades_id_necesidad) {
        this.necesidades_id_necesidad = necesidades_id_necesidad;
    }

    public String getUsuarios_usuario() {
        return usuarios_usuario;
    }

    public void setUsuarios_usuario(String usuarios_usuario) {
        this.usuarios_usuario = usuarios_usuario;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    
    
    public String envio(String mail,String subject,String content){ //en mail la direccion a la cual queremos mandar,en subject el asunto y content el contenido del msj
       
        String host = "mail.soydonar.com";
        String port = "8025";
        String user = "info@soydonar.com";
        String pass = "111Equipo111";
        content=content+"\n\n\nMuchas Gracias\nStaff de www.soydonar.com";
        
        String recipient = mail.toString();
        
 
        String resultMessage = "";
 
        try {
            EmailUtility.sendEmail(host, port, user, pass, recipient, subject,
                    content);
            resultMessage = "El email fue enviado de forma exitosa";
        } catch (Exception ex) {
            ex.printStackTrace();
            resultMessage = "Ha ocurrido un error: " + ex.getMessage();
        } 
    
  
    return resultMessage; 
    }
    
    public String guardar_coment() throws SQLException{//guardo una notificacion de comentarios
        Select select=new Select();
        Insert insert=new Insert();
        ResultSet rs;
        rs=select.selectUsuario(necesidades_id_necesidad);
        if(!rs.next()){
            select.cerrarConexion();
            insert.cerrarConexion();
            return "746";
        }
        usuarios_usuario=rs.getString("usuarios_usuario");
        String datos[]={necesidades_id_necesidad,usuarios_usuario,descripcion};
        insert.insert("INSERT INTO notificaciones ( necesidades_id_necesidad, usuarios_usuario,descripcion) VALUES (?,?,?)", datos);
        select.cerrarConexion();
        insert.cerrarConexion();
        return "OK";
    } 
    
    public String guardar_don() throws SQLException{//guardo una notificacion de donacion
        Select select=new Select();
        Insert insert=new Insert();
        ResultSet rs;
        String datos[]={necesidades_id_necesidad,usuarios_usuario,descripcion};
        insert.insert("INSERT INTO notificaciones ( necesidades_id_necesidad, usuarios_usuario,descripcion) VALUES (?,?,?)", datos);
        select.cerrarConexion();
        insert.cerrarConexion();
        return "OK";
    } 
}
