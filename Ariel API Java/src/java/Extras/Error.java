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


//Clase que se utiliza para devolver un error, con el codigo del error (ver gdoc de errores) y las descripcion
public class Error {
    
    private String codigo;
    private String descrip;

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescrip() {
        return descrip;
    }

    public void setDescrip(String descrip) {
        this.descrip = descrip;
    }

    public Error(String codigo, String descrip) {
        this.codigo = codigo;
        this.descrip = descrip;
    }
    
    
    
}
