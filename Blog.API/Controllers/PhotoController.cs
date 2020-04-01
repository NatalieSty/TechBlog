using System;
using System.Threading.Tasks;
using AutoMapper;
using Blog.API.Data;
using Blog.API.Dtos;
using Blog.API.Helpers;
using Blog.API.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Blog.API.Controllers
{
    [ApiController]
    [Route("api/post/{postId}/photo")]
    public class PhotoController : Controller
    {
        private readonly IBlogRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly Cloudinary _cloudinary;

        public PhotoController(IBlogRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(_cloudinaryConfig.Value.CloudName, 
                                      _cloudinaryConfig.Value.ApiKey,
                                      _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name ="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);

            if (photo == null)
            {
                return BadRequest("Photo not found");
            }

            return Ok(photo);
        }

        [HttpGet("{id}/photos")]
        public async Task<IActionResult> GetPhotos(int id)
        {
            var photos = await _repo.GetPhotos(id);

            return Ok(photos);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForPost(int postId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);


                };
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            photo.PostId = postId;

            _repo.Add(photo);
            if(await _repo.SaveAll())
            {
                
                return CreatedAtRoute("GetPhoto", new {postId = postId ,id = photo.Id}, photo);
            }
            throw new Exception("error saving photo");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photo = await _repo.GetPhoto(id);
            if (photo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if(result.Result == "ok"){
                    _repo.Delete(photo);
                }
            }
            if (photo.PublicId == null)
            {
                _repo.Delete(photo);
            }

            if(await _repo.SaveAll()) {
                return Ok("Deleted photo");
            }

            return BadRequest("failed to delete photo");

        }

    }
}