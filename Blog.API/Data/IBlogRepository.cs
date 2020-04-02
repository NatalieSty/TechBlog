using System.Collections.Generic;
using System.Threading.Tasks;
using Blog.API.Helpers;
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
        Task<PagedList<Post>> GetPosts(PostParams postParams);

        Task<Photo> GetPhoto(int photoId);
        Task<IEnumerable<Photo>> GetPhotos(int postId);
        Task<IEnumerable<Project>> GetProjects();
        Task<Project> GetProject(int id);
    }
}