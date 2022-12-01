using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
ConfigureAuthentication(builder);

builder.Services.AddAuthorization();
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();

app.Run();


void ConfigureAuthentication(WebApplicationBuilder builder)
{
    IConfigurationSection bearerConfiguration = builder.Configuration.GetSection("Bearer");
    string[]? scopes = bearerConfiguration
        .GetSection("Scopes")?
        .GetChildren()?
        .Select(x => x.Value)?
        .ToArray();

    builder.Services
        .AddAuthentication(options =>
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        })
        .AddCookie()
        .AddOpenIdConnect(options =>
        {
            options.SignInScheme = "Cookies";
            options.Authority = bearerConfiguration.GetValue<string>("Authority");
            options.RequireHttpsMetadata = true;
            options.ClientId = bearerConfiguration.GetValue<string>("ClientId");
            options.ClientSecret = bearerConfiguration.GetValue<string>("ClientSecret");
            options.ResponseType = "code";
            options.UsePkce = true;
            options.SaveTokens = true;
            AddScopes(options, scopes);
        });
}

void AddScopes(OpenIdConnectOptions options, string[]? scopes)
{
    if (scopes == null)
    {
        return;
    }

    for (int counter = 0; counter < scopes.Length; counter++)
    {
        options.Scope.Add(scopes[counter]);
    }
}