namespace KReenRegistration.Models
{
    public partial class Provinsi
    {
        public Provinsi()
        {
            KabupatenKota = new HashSet<KabupatenKota>();
        }

        public byte Kode { get; set; }
        public string Nama { get; set; } = string.Empty;

        public virtual ICollection<KabupatenKota> KabupatenKota { get; set; }
    }
}
