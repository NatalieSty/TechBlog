using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Blog.API.Data;
using Blog.API.Dtos;
using Blog.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly IBlogRepository _repo;
        private readonly IMapper _mapper;

        public PostController(IBlogRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}", Name = "GetPost")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _repo.GetPost(id);

            var postForDetail = _mapper.Map<PostForDetailedDto>(post);
            return Ok(postForDetail);
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _repo.GetPosts();
            var postToReturn = _mapper.Map<IEnumerable<PostToReturnDto>>(posts);
            return Ok(postToReturn);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost(PostForCreationDto postForCreationDto)
        {
           
            
            var post = _mapper.Map<Post>(postForCreationDto);

            _repo.Add(post);

            if (await _repo.SaveAll())
            {
                var postToReturn = _mapper.Map<PostToReturnDto>(post);

                return CreatedAtRoute("GetPost", new { id = post.Id}, postToReturn);
            }
            
            throw new Exception("Failed to save post");
        }

    }
}