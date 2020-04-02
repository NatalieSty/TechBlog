using System;

namespace Blog.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string Skills { get; set; }
        public string Intro { get; set; }
        public string Description { get; set; }
        public string Created { get; set; }
        public string Context { get; set; }
        public string Url { get; set; }
    }
}