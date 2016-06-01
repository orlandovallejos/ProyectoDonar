/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package BD;

import java.sql.*;

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
        try{
            s=con.prepareStatement("select * from usuarios where usuario=?");  
            for(int i=1;i<=datos.length;i++)
                s.setString(i,datos[i-1]);
            resultado = s.executeQuery();
        } 
        catch (SQLException ex) {
        }
        
        return resultado;
    }
    
}