using System;
using System.Collections.Generic;

namespace KReenRegistration.Models
{
    public partial class DataAffiliate
    {
        public uint Id { get; set; }
        public string Nama { get; set; }
        public string KodeReferral { get; set; }
        public byte Approved { get; set; }
    }
}
