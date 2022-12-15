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
    }
}
