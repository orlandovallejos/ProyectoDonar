
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
            //LOCAL FUNCIONA, se usa para probar localmente y poder usar la base de datos del servidor
           Class.forName("com.mysql.jdbc.Driver").newInstance();
           con = DriverManager.getConnection("jdbc:mysql://jns3.dailyrazor.com:3306/soydonar_db?user=soydonar_us&password=111Equipo111");
        //finaliza conexion local

           //WEB FUNCIONA con smart.net
           //Class.forName("com.mysql.jdbc.Driver").newInstance();
           //con = DriverManager.getConnection("jdbc:mysql://MYSQL5011.Smarterasp.net:3306/db_9ff664_donar?user=9ff664_donar&password=equipo111");
        //finaliza conexion con smart.net
           
           
            //WEB FUNCION CON BD DEFINITIVA
           //Class.forName("com.mysql.jdbc.Driver").newInstance();
           //con = DriverManager.getConnection("jdbc:mysql://localhost:3306/soydonar_db?user=soydonar_us&password=111Equipo111");
           //finaliza conexion con bd definitiva
            
        }
        catch(Exception e){
            System.out.println("Falló la conexion a la base de datos");          
        }
        return con;
    }

    public Conexion() {
    }
    
    
    
}
