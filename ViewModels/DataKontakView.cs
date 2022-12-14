namespace KReenRegistration.ViewModels
{
    public class DataKontakView
    {
        public uint Id { get; set; }
        public string Nama { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NomorHp { get; set; } = string.Empty;
        public DateTime TanggalLahir { get; set; }
        public string JenisKelamin { get; set; } = string.Empty;
        public string Alamat { get; set; } = string.Empty;
        public ushort KodeKabupatenKota { get; set; }
        public string KodePos { get; set; } = string.Empty;
    }
}
