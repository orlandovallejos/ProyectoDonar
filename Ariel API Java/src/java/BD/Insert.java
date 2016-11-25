/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package BD;


import java.sql.*;
import java.sql.Connection;


/**
 *
 * @author Ari
 */
public class Insert {

    private Conexion bd;
    private Connection con;
    private PreparedStatement s;
    private ResultSet resultado;
    
    
    public Insert() {
        bd=new Conexion();
        con=bd.conectar();
        s = null;
        resultado=null;
    }
    
    
    public void insert(String query,String datos[]) throws SQLException
    {

        
            s=con.prepareStatement(query);
            for(int i=1;i<=datos.length;i++)
            s.setString(i,datos[i-1]);
            s.execute();
        
                
        
    }
    
    
    public void insertSimple(String query,String id) throws SQLException
    {
            s=con.prepareStatement(query);
            s.setString(1,id);
            s.execute();        
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
}

