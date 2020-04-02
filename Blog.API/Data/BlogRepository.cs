using System.Collections.Generic;
using System.Threading.Tasks;
using Blog.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Blog.API.Helpers;

namespace Blog.API.Data
{
    public class BlogRepository : IBlogRepository
    {
        private readonly DataContext _context;
        public BlogRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public Task<Photo> GetPhoto(int photoId)
        {
            var photo = _context.Photos.FirstOrDefaultAsync(p => p.Id ==  photoId);
            return photo;
        }

        public async Task<IEnumerable<Photo>> GetPhotos(int postId)
        {
            var photos = await _context.Photos.Where(p => p.PostId == postId).ToListAsync();
            
            return photos;
        }

        public async Task<Post> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == id);
            return post;
        }

        public async Task<PagedList<Post>> GetPosts(PostParams postParams)
        {
            var posts = _context.Posts.Where(p => p.IsVisible == true).Include(p => p.Photos).OrderByDescending(p => p.Created);

            return await PagedList<Post>.CreateAsync(posts, postParams.PageNumber, postParams.PageSize);
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var projects = await _context.Projects.OrderByDescending(p => p.Id).ToListAsync();
            return projects;
        }

        public Task<Project> GetProject(int id)
        {
            var project = _context.Projects.FirstOrDefaultAsync(p => p.Id == id);
            return project;
        }

        public Task<User> GetUser(int id)
        {
            var user = _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            return user;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}