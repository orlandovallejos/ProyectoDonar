
package BD;

import java.sql.Connection;
import java.sql.DriverManager;


/**
 *
 * @author Ari
 */
public class Conexion {
        
        Connection con=null;

    public Connection conectar(){
        
       
        try{
            //LOCAL FUNCIONA
           //Class.forName(driver);
           //con=DriverManager.getConnection(url, user, pass);
            
            String url="jdbc:mysql://mysql13.000webhost.com:3306/a8095365_donar";
            String driver="org.gjt.mm.mysql.Driver";
            String user="a8095365_donarus";
            String pass="equipo111";  
            

           //WEB FUNCIONA
           Class.forName("com.mysql.jdbc.Driver").newInstance();
           con = DriverManager.getConnection("jdbc:mysql://MYSQL5011.Smarterasp.net:3306/db_9ff664_donar?user=9ff664_donar&password=equipo111");
           //con = DriverManager.getConnection(url, user, pass);
        
        }
        catch(Exception e){
            System.out.println("Falló la conexion a la base de datos");          
        }
        return con;
    }

    public Conexion() {
    }
    
}
