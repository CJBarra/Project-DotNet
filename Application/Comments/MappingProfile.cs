using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.Author.DisplayName));
        }
    }
}