namespace KReenRegistration.Models
{
    public partial class DataKontak
    {
        public uint Id { get; set; }
        public string Nama { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NomorHp { get; set; } = string.Empty;
        public DateOnly TanggalLahir { get; set; }
        public string JenisKelamin { get; set; } = string.Empty;
        public string Alamat { get; set; } = string.Empty;
        public ushort KodeKabupatenKota { get; set; }
        public string KodePos { get; set; } = string.Empty;

        public virtual KabupatenKota? KabupatenKotaNavigation { get; set; }
    }
}
