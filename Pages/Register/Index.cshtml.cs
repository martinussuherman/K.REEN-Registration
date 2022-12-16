using AutoMapper;
using KReenRegistration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace KReenRegistration.Pages.Register
{
    public class IndexModel : PageModel
    {
        public IndexModel()
        {
        }

        [BindProperty]
        public PostViewModel PostModel { get; set; } = new();

        public IActionResult OnGet()
        {
            return Page();
        }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
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
    }
}
