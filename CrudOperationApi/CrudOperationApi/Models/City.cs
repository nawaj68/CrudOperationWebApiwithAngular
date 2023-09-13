using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.ObjectModel;

namespace CrudOperation.Models
{
    public class City
    {
        public City()
        {
            Employees= new Collection<Employee>();
        }
        public int Id { get; set; }
        public string CityName { get; set; }
        public int StateId { get; set; }

        public State State { get; set; }

        public IList<Employee> Employees { get; set; }
    }
}
