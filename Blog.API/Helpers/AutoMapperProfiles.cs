using AutoMapper;
using Blog.API.Dtos;
using Blog.API.Models;

namespace Blog.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Post, PostForDetailedDto>();
            CreateMap<PostForCreationDto, Post>();
            CreateMap<Post, PostToReturnDto>();
            CreateMap<Photo, PhotosForDetailedDto>();
        }
    }
}