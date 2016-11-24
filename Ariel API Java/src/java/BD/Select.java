/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package BD;

import Extras.Filtro;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Ari
 */
public class Select {
    
    private Conexion bd;
    private Connection con;
    private PreparedStatement s;
    private ResultSet resultado;
    
    
    public Select() {
        bd=new Conexion();
        con=bd.conectar();
        s = null;
        resultado=null;
    }
    
    
    
   
    
    public ResultSet simpleSelect(String datos[]) throws SQLException
    {
        
            s=con.prepareStatement("select * from usuarios where usuario=? AND contrasenia=?");  
            for(int i=1;i<=datos.length;i++)
                s.setString(i,datos[i-1]);
            resultado = s.executeQuery();
            return resultado;
    }
    
    public ResultSet selectUsuario(String datos[]) throws SQLException
    {
        
            s=con.prepareStatement("select * from usuarios where usuario=?");  
            for(int i=1;i<=datos.length;i++)
                s.setString(i,datos[i-1]);
            resultado = s.executeQuery();

        
        return resultado;
    }
    
  public ResultSet selectCategorias() throws SQLException
    {
        try{
            s=con.prepareStatement("select nombre_categoria from categorias");  
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }  
    
    
    public ResultSet selectContrasenia(String datos[]) throws SQLException
    {
        try{
            s=con.prepareStatement("select contrasenia from usuarios where usuario=?");  
            for(int i=1;i<=datos.length;i++)
                s.setString(i,datos[i-1]);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
 
    
    public ResultSet necesidadesHome() throws SQLException
    {
        
        try{
            s=con.prepareStatement("SELECT id_necesidad,titulo,fecha_creacion,comentarios,necesidad,cant_likes,imagen_path FROM necesidades ORDER BY fecha_creacion desc limit 9");
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return resultado;
    }

    public ResultSet necesidadesFav(String user) throws SQLException
    {
        
        try{
            s=con.prepareStatement("SELECT id_necesidad,titulo,fecha_creacion,comentarios,necesidad,cant_likes,imagen_path FROM necesidades n JOIN favoritos f ON n.id_necesidad=f.necesidades_id_necesidad WHERE f.usuarios_usuario=?");
            s.setString(1, user);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return resultado;
    }    
	
     public ResultSet necesidadesLikes(String user) throws SQLException
    {
        
        try{
            s=con.prepareStatement("SELECT id_necesidad,titulo,fecha_creacion,comentarios,necesidad,cant_likes,imagen_path FROM necesidades n JOIN likes f ON n.id_necesidad=f.necesidades_id_necesidad WHERE f.usuarios_usuario=?");
            s.setString(1, user);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return resultado;
    } 
	
    public ResultSet imagenUser(String user) throws SQLException
    {
        
        try{
            s=con.prepareStatement("SELECT imagen_path FROM usuarios WHERE usuario=?");
            s.setString(1,user);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return resultado;
    }

    
    public ResultSet necesidadesHomePorUsuario(String usuario) throws SQLException
    {
        
        
            s=con.prepareStatement("SELECT id_necesidad,titulo,fecha_creacion,comentarios,necesidad,cant_likes,imagen_path FROM necesidades WHERE usuarios_usuario =? ORDER BY fecha_creacion desc");
            s.setString(1,usuario);
            resultado = s.executeQuery();
        
        return resultado;
    }
    
    public ResultSet cantFotos(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT COUNT(id_foto) col FROM fotos WHERE necesidades_id_necesidad=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    //consulta que devuelve la imagen del usuario creador de la necesidad.recibe el id de la necesdiad
    public ResultSet avatar(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT usuarios.imagen_path FROM usuarios JOIN necesidades ON usuarios.usuario=necesidades.usuarios_usuario WHERE necesidades.id_necesidad=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    public ResultSet necesidadInfo(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("select * from necesidades where id_necesidad=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    
        public ResultSet comentarios(String id) throws SQLException
    {
        try{
            //s=con.prepareStatement("select * from comentarios where necesidades_id_necesidad=?");  
            s=con.prepareStatement("SELECT id_comentario, comentario, fecha, positivos, negativos, usuarios_usuario, imagen_path FROM comentarios c JOIN usuarios u ON c.usuarios_usuario = u.usuario WHERE necesidades_id_necesidad =?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
        
        
        public ResultSet pendientesDonatario(String id) throws SQLException
    {
        try{
            //s=con.prepareStatement("select * from comentarios where necesidades_id_necesidad=?");  
            s=con.prepareStatement("SELECT * FROM donacion d JOIN necesidades n ON d.necesidades_id_necesidad = n.id_necesidad  WHERE d.usuarios_usuario_donatario=? AND d.estado_donatario='0' ");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }        

        
        public ResultSet pendientesDonante(String id) throws SQLException
    {
        
            //s=con.prepareStatement("select * from comentarios where necesidades_id_necesidad=?");  
            s=con.prepareStatement("SELECT * FROM donacion d JOIN necesidades n ON d.necesidades_id_necesidad = n.id_necesidad  WHERE d.usuarios_usuario_donante=? AND d.estado_donante='0' ");  
            s.setString(1,id);
            resultado = s.executeQuery();
     
        return resultado;
    }  
       
    
            public ResultSet donacionesConcretadas(String id) throws SQLException
    {
        try{
            //s=con.prepareStatement("select * from comentarios where necesidades_id_necesidad=?");  
            s=con.prepareStatement("SELECT * FROM donacion d JOIN necesidades n ON d.necesidades_id_necesidad = n.id_necesidad  WHERE (d.usuarios_usuario_donatario=? OR d.usuarios_usuario_donante=?) AND d.estado='1' ");  
            s.setString(1,id);
            s.setString(2,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
        
        
        
    //obtiene toda la info de un usuario
    public ResultSet infoUusario(String id) throws SQLException
    {
        try{
            //s=con.prepareStatement("select * from comentarios where necesidades_id_necesidad=?");  
            s=con.prepareStatement("SELECT * FROM usuarios WHERE usuario=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    //funcion para filtrar necesidades con diferentes filtros .Si envio "all" busco por zona y categoria,sino busco por zona o por categoria
    public ResultSet busquedaPorFiltro(Filtro filtro) throws SQLException
    {
        String datos[]={"","",""};
        try{
            if("all".equals(filtro.getTipo())){// si mando all busco la clave en el titulo la descripcion y la zona , y con la categoria correspondiente
                datos[0]=filtro.getClave();
                datos[1]=filtro.getCategoria();
                if("todas".equals(filtro.getCategoria()))
                    s=con.prepareStatement("SELECT * FROM necesidades WHERE direccion LIKE '%"+datos[0]+"%' OR titulo LIKE '%"+datos[0]+"%' OR necesidad LIKE '%"+datos[0]+"%'");
                else
                    s=con.prepareStatement("SELECT * FROM necesidades WHERE (direccion LIKE '%"+datos[0]+"%' OR titulo LIKE '%"+datos[0]+"%' OR necesidad LIKE '%"+datos[0]+"%') AND categorias_nombre_categoria LIKE '%"+datos[1]+"%'");
            }
            else{
                if("cat".equals(filtro.getTipo()))
                    datos[0]=filtro.getCategoria();//en datos 0 escribo la categoria para filtrar solo por las categorias
                s=con.prepareStatement("SELECT * FROM necesidades WHERE categorias_nombre_categoria LIKE '%"+datos[0]+"%'");
            }
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return resultado;
    }
          
    public void cerrarConexion(){
        if(s!=null){
            try{
                s.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
        if(con!=null){
            try{
                con.close();
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
    }
	
	     public ResultSet estado_donacion_donatario(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT estado_donatario,usuarios_usuario_donante,usuarios_usuario_donatario,aporte_monetario,necesidades_id_necesidad FROM donacion WHERE id_donacion=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
	
	 public ResultSet estado_donacion_donante(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT estado_donante,usuarios_usuario_donante,usuarios_usuario_donatario,aporte_monetario,necesidades_id_necesidad FROM donacion WHERE id_donacion=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
         
    public ResultSet cantDonacionesConc() throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT COUNT(estado) col FROM donacion WHERE estado=1");  
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    public ResultSet cantDonacionesNoConc() throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT COUNT(estado) col FROM donacion WHERE estado=0");  
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    public ResultSet cantDineroDonado() throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT SUM(aporte_monetario) col FROM donacion WHERE estado=1"); 
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    public ResultSet cantDonaciones(String id) throws SQLException
    {
        try{
            s=con.prepareStatement("SELECT COUNT(id_donacion) col FROM donacion WHERE necesidades_id_necesidad=?");  
            s.setString(1,id);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        
        return resultado;
    }
    
    
    
}
