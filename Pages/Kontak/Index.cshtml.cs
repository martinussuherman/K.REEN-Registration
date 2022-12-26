using AutoMapper;
using KReenRegistration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace KReenRegistration.Pages.Kontak
{
    public class IndexModel : PageModel
    {
        public IndexModel(KreenContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [BindProperty]
        public PostViewModel PostModel { get; set; } = new();

        public IActionResult OnGet()
        {
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            DataKontak item = _mapper.Map<PostViewModel, DataKontak>(PostModel);
            _context.DataKontak.Add(item);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Page();
        }

        public class PostViewModel
        {
            public string Nama { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string NomorHp { get; set; } = string.Empty;
            public DateTime TanggalLahir { get; set; }
            public string JenisKelamin { get; set; } = string.Empty;
            public string Alamat { get; set; } = string.Empty;
            public ushort KodeProvinsi { get; set; }
            public ushort KodeKabupatenKota { get; set; }
            public string KodePos { get; set; } = string.Empty;
        }

        private readonly KreenContext _context;
        private readonly IMapper _mapper;
    }
}
