/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package Extras;

import java.util.ArrayList;

/**
 *
 * @author Ari
 */
public class Resultado {
    private String id;
    private String titulo;
    private String resultado;
    private String fecha;
    private String id_nec;
    private ArrayList<String> lista_donadores = new ArrayList<String>();

  
    //contructor para crear resultado
    public Resultado(String titulo, String resultado, String fecha,String id_necesidad) {
        this.titulo = titulo;
        this.resultado = resultado;
        this.fecha = fecha;
        this.id_nec=id_necesidad;
    }

    public Resultado(String id, String titulo, String resultado, String fecha, String id_nec) {
        this.id = id;
        this.titulo = titulo;
        this.resultado = resultado;
        this.fecha = fecha;
        this.id_nec = id_nec;
    }

    public ArrayList<String> getLista_donadores() {
        return lista_donadores;
    }

    public void setLista_donadores(ArrayList<String> lista_donadores) {
        this.lista_donadores = lista_donadores;
    }
    
    
    
    
    public String getId_nec() {
        return id_nec;
    }

    public void setId_nec(String id_nec) {
        this.id_nec = id_nec;
    }

    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getResultado() {
        return resultado;
    }

    public void setResultado(String resultado) {
        this.resultado = resultado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }
    
    
    public String validarResultado(){
        if (getResultado() == null || getResultado().length()<1) {
            return "736";
        }
        if (getResultado().length() > 200) {
            return "737";
        }
        if (getTitulo() == null || getTitulo().length()<1) {
            return "738";
        }
        if (getTitulo().length() > 100) {
            return "739";
        }
        if(getFecha() == null || getFecha().length()<1)
            return "740";
        
        return "OK";
        
    }
}
