﻿namespace KReenRegistration.Models
{
    public partial class KabupatenKota
    {
        public KabupatenKota()
        {
            DataKontak = new HashSet<DataKontak>();
        }

        public ushort Kode { get; set; }
        public string Nama { get; set; } = string.Empty;
        public byte KodeProvinsi { get; set; }

        public virtual Provinsi? ProvinsiNavigation { get; set; }
        public virtual ICollection<DataKontak> DataKontak { get; set; }
    }
}
