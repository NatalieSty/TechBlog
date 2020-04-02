using System.Threading.Tasks;
using AutoMapper;
using Blog.API.Data;
using Blog.API.Dtos;
using Blog.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Blog.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        private readonly IBlogRepository _repo;
        private readonly IMapper _mapper;

        public ProjectController(IBlogRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _repo.GetProjects();
            return Ok(projects);
        }

        [HttpGet("{id}", Name="GetProject")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _repo.GetProject(id);
            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(ProjectForCreationDto projectForCreationDto)
        {
            var project = _mapper.Map<Project>(projectForCreationDto);
            
            _repo.Add(project);

            if (await _repo.SaveAll()){
                return CreatedAtRoute("GetProject", new{ id = project.Id }, project);
            }

            return BadRequest("Failed to save project");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(int id, ProjectForCreationDto projectForCreationDto)
        {
            var projectFromRepo = await _repo.GetProject(id);

            _mapper.Map(projectForCreationDto, projectFromRepo);

            if (await _repo.SaveAll()){
                return Ok();
            }

            return BadRequest("Failed to update project");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var projectFromRepo = await _repo.GetProject(id);

            if( projectFromRepo == null){
                return BadRequest("Cannot find project");
            }
            
            _repo.Delete(projectFromRepo);

            if (await _repo.SaveAll()){
                return Ok();
            }

            return BadRequest("Failed to delete project");
        }

        
    }
}