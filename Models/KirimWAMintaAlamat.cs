using System;
using System.Collections.Generic;

namespace KReenRegistration.Models
{
    public partial class KirimWAMintaAlamat
    {
        public uint Id { get; set; }
        public byte WaSent { get; set; }

        public virtual DataKontak IdNavigation { get; set; }
    }
}
