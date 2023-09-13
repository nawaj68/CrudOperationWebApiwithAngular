using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrudOperation.Models
{
    public class State
    {
        public State()
        {
            Cities = new Collection<City>();
            Employees = new Collection<Employee>();
        }
        public int Id { get; set; }
        
        public string StateName { get; set; }

        public int CountryId { get; set; }
        public Country Country { get; set; }

        public IList<City> Cities { get; set; }
        public IList<Employee> Employees { get; set; }
    }
}
