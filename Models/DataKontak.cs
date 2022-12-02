using System;
using System.Collections.Generic;

namespace KReenRegistration.Models
{
    public partial class DataKontak
    {
        public uint Id { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public string NomorHp { get; set; }
        public DateOnly TanggalLahir { get; set; }
        public string JenisKelamin { get; set; }
        public string Alamat { get; set; }
        public ushort KodeKabupatenKota { get; set; }
        public string KodePos { get; set; }

        public virtual KabupatenKota KodeKabupatenKotaNavigation { get; set; }
    }
}
