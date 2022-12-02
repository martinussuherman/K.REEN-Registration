﻿using System;
using System.Collections.Generic;

namespace KReenRegistration.Models
{
    public partial class KabupatenKota
    {
        public KabupatenKota()
        {
            Datakontaks = new HashSet<DataKontak>();
        }

        public ushort Kode { get; set; }
        public string Nama { get; set; }
        public byte KodeProvinsi { get; set; }

        public virtual Provinsi KodeProvinsiNavigation { get; set; }
        public virtual ICollection<DataKontak> Datakontaks { get; set; }
    }
}