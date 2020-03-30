using System;

namespace Blog.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public Post Post { get; set; }
        public int PostId { get; set; }
    }
}