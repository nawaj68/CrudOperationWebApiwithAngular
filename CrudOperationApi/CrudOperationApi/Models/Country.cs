using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace CrudOperation.Models
{
    public class Country
    {
        public int Id { get; set; }
        public string CountryName { get; set; }

        public IList<State> States { get; set; }
        public IList<Employee> Employees { get; set; }
    }
}
