using System;
using System.Collections.Generic;
using Blog.API.Models;

namespace Blog.API.Dtos
{
    public class PostForCreationDto
    {
         public string Title { get; set; }
         public DateTime Created { get; set; }
         public string Content { get; set; }
        //  public ICollection<Photo> Photos { get; set; } { get; set; }
        public PostForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}