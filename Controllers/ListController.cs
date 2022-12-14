using AutoMapper;
using AutoMapper.QueryableExtensions;
using KReenRegistration.Models;
using KReenRegistration.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KReenRegistration.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListController : ControllerBase
    {
        public ListController(KreenContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet(nameof(Provinsi))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<ProvinsiView>> Provinsi()
        {
            return await _context.Provinsi
                .Where(p => p.Kode != 0)
                .AsNoTracking()
                .ProjectTo<ProvinsiView>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        [HttpGet(nameof(KabupatenKota))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<KabupatenKotaView>> KabupatenKota()
        {
            return await _context.KabupatenKota
               .AsNoTracking()
               .ProjectTo<KabupatenKotaView>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }
        [HttpGet(nameof(KabupatenKotaByProvinsi))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<List<KabupatenKotaView>> KabupatenKotaByProvinsi(byte kodeProvinsi)
        {
            return await _context.KabupatenKota
                .Where(k => k.KodeProvinsi == kodeProvinsi)
                .AsNoTracking()
                .ProjectTo<KabupatenKotaView>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }


        private readonly KreenContext _context;
        private readonly IMapper _mapper;
    }
}
