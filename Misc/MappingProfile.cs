using AutoMapper;
using KReenRegistration.Models;
using KReenRegistration.ViewModels;

namespace KReenRegistration.Misc
{
    /// <summary>
    /// AutoMapper mapping profile.
    /// </summary>
    public class MappingProfile : Profile
    {
        /// <summary>
        /// Creates AutoMapper mapping profile.
        /// </summary>
        public MappingProfile()
        {
            CreateMap<Provinsi, ProvinsiView>();
            CreateMap<KabupatenKota, KabupatenKotaView>();
            CreateMap<Pages.Kontak.IndexModel.PostViewModel, DataKontak>();
        }
    }
}