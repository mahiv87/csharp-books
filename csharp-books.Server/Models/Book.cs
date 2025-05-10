using System;
using System.ComponentModel.DataAnnotations;

namespace csharp_books.Server.Models
{
    public class Book
    {
        [Display(Name = "id")]
        public int ID { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string description { get; set; }
        public int copies { get; set; }
        public int copiesAvailable { get; set; }
        public string category { get; set; }
        public string img { get; set; }
    }
}
