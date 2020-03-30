using System.Collections.Generic;
using System.Threading.Tasks;
using Blog.API.Models;

namespace Blog.API.Data
{
    public interface IBlogRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<User> GetUser(int id);
        Task<Post> GetPost(int id);
        Task<IEnumerable<Post>> GetPosts();
        
    }
}