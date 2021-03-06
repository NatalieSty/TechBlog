using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Blog.API.Data;
using Blog.API.Dtos;
using Blog.API.Helpers;
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

            if (post == null)
            {
                return BadRequest("Post not found");
            }

            var postForDetail = _mapper.Map<PostForDetailedDto>(post);
            return Ok(postForDetail);
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery]PostParams postParams)
        {
            var posts = await _repo.GetPosts(postParams);

            var postToReturn = _mapper.Map<IEnumerable<PostToReturnDto>>(posts);

            Response.AddPagination(posts.CurrentPage, posts.PageSize, posts.TotalCount, posts.TotalPages);

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


                return CreatedAtRoute("GetPost", new { id = post.Id }, postToReturn);
            }

            return BadRequest("Failed to save post");
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, PostForUpdateDto postForUpdateDto)
        {

            var postFromRepo = await _repo.GetPost(id);

            _mapper.Map(postForUpdateDto, postFromRepo);
            postFromRepo.IsVisible = true;

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating post {id} failed on save");

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _repo.GetPost(id);

            if( post == null){
                return BadRequest("Cannot find post");
            }
            
            _repo.Delete(post);

            if (await _repo.SaveAll()){
                return Ok();
            }

            return BadRequest("Failed to delete post");
        }


    }
}