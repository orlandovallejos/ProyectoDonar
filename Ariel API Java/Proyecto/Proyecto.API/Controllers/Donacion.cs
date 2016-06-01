using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Proyecto.API.Controllers
{
    public class Donacion
    {
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
    }

    public class DonacionController : ApiController
    {
        // GET api/donacion
        public IEnumerable<Donacion> Get()
        {
            List<Donacion> lista = new List<Donacion>();
            lista.Add(new Donacion { Titulo = "se buscan dadores", Descripcion = "Descripción de la donación sobre dadores de sangre" });
            lista.Add(new Donacion { Titulo = "Comedor chicos felices", Descripcion = "Ayuda para el comedor de chicos en zona sur" });
            lista.Add(new Donacion { Titulo = "Narices frías", Descripcion = "Estamos buscando ropita y comida para nuestros amigos caninos" });

            return lista;
        }

        // GET api/donacion/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/donacion
        public void Post([FromBody]string value)
        {
        }

        // PUT api/donacion/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/donacion/5
        public void Delete(int id)
        {
        }
    }
}
