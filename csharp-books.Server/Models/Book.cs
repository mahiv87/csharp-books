using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace csharp_books.Server.Models
{
    [Table("book")]
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        public string Title { get; set; }

        [Column("author")]
        public string Author { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("copies")]
        public int Copies { get; set; }

        [Column("copies_available")]
        public int CopiesAvailable { get; set; }

        [Column("category")]
        public string Category { get; set; }

        [Column("img")]
        public string Img { get; set; }
    }
}
