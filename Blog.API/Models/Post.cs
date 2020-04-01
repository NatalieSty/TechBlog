using System;
using System.Collections.Generic;

namespace Blog.API.Models
{
    public class Post
    {
         public int Id { get; set; }
         public string Title { get; set; }
         public DateTime Created { get; set; }
         public string Content { get; set; }
         public ICollection<Photo> Photos { get; set; }
         public bool IsVisible { get; set; }
    }
}