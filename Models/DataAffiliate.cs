namespace KReenRegistration.Models
{
    public partial class DataAffiliate
    {
        public uint Id { get; set; }
        public short WpamId { get; set; }
        public string FriendlyId { get; set; } = string.Empty;
        public string Nama { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NomorHp { get; set; } = string.Empty;
        public string Instagram { get; set; } = string.Empty;
        public string Tiktok { get; set; } = string.Empty;
        public string Facebook { get; set; } = string.Empty;
        public string KodeReferral { get; set; } = string.Empty;
        public byte Approved { get; set; }
    }
}
