using Domain;

namespace Application.Interfaces
{
    public interface IJwTokenGenerator
    {
        string CreateToken(AppUser user);
    }
}