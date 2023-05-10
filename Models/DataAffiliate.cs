using System;
using System.Collections.Generic;

namespace KReenRegistration.Models
{
    public partial class DataAffiliate
    {
        public uint Id { get; set; }
        public short WpamId { get; set; }
        public string FriendlyId { get; set; }
        public string Nama { get; set; }
        public string Email { get; set; }
        public string NomorHp { get; set; }
        public string Instagram { get; set; }
        public string Tiktok { get; set; }
        public string Facebook { get; set; }
        public string KodeReferral { get; set; }
        public byte Approved { get; set; }
    }
}
