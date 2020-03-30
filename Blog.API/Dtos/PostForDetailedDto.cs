using System;
using System.Collections.Generic;
using Blog.API.Models;
using Blog.API.Dtos;

namespace Blog.API.Dtos
{
    public class PostForDetailedDto
    {
        public int Id { get; set; }
         public string Title { get; set; }
         public DateTime Created { get; set; }
         public string Content { get; set; }
         public ICollection<PhotosForDetailedDto> Photos { get; set; } 
    }
}