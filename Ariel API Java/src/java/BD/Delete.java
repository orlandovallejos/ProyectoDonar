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
public class Delete {

    private Conexion bd;
    private Connection con;
    private PreparedStatement s;
    private ResultSet resultado;
    
    
    public Delete() {
        bd=new Conexion();
        con=bd.conectar();
        s = null;
        resultado=null;
    }
    
    
    public  void delete(String query,String datos[]) throws SQLException
    {
        try{
            s=con.prepareStatement(query);
            for(int i=1;i<=datos.length;i++)
                s.setString(i,datos[i-1]);
            s.execute();
        } 
        catch (SQLException ex) {
            ex.printStackTrace();
        }
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

