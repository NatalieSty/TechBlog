using System.Collections.Generic;
using System.Threading.Tasks;
using Blog.API.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Post> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == id);
            return post;
        }

        public async Task<IEnumerable<Post>> GetPosts()
        {
            var posts = await _context.Posts.Include(p => p.Photos).ToListAsync();
            return posts;
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