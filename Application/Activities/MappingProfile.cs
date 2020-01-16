using AutoMapper;
using Domain;

/*
    { Auto Mapper NuGet Package used to cleanup object to object mapping,
    Doc reference:  https://docs.automapper.org/en/stable/index.html }
 */

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
                .ForMember(d => d.Username, ob => ob.MapFrom(ua => ua.AppUser.UserName))
                .ForMember(d => d.DisplayName, ob => ob.MapFrom(ua => ua.AppUser.DisplayName));
                // .ForMember(d => d.Image, ob => ob.MapFrom(ua => ua.AppUser.Image));
        }
    }
}