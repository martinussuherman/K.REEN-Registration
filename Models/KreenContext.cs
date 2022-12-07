using Microsoft.EntityFrameworkCore;

namespace KReenRegistration.Models
{
    public partial class KreenContext : DbContext
    {
        public KreenContext(DbContextOptions<KreenContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DataAffiliate> DataAffiliate { get; set; }
        public virtual DbSet<DataKontak> DataKontak { get; set; }
        public virtual DbSet<KabupatenKota> KabupatenKota { get; set; }
        public virtual DbSet<KirimWAMintaAlamat> KirimWAMintaAlamat { get; set; }
        public virtual DbSet<Provinsi> Provinsi { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8_general_ci")
                .HasCharSet("utf8");

            modelBuilder.Entity<DataAffiliate>(entity =>
            {
                entity.ToTable("dataaffiliate");

                entity.Property(e => e.Id).HasColumnType("mediumint(8) unsigned");

                entity.Property(e => e.Approved).HasColumnType("tinyint(3) unsigned");

                entity.Property(e => e.KodeReferral)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");
            });

            modelBuilder.Entity<DataKontak>(entity =>
            {
                entity.ToTable("datakontak");

                entity.HasIndex(e => e.KodeKabupatenKota, "FK_datakontak_kabupatenkota");

                entity.Property(e => e.Id).HasColumnType("mediumint(8) unsigned");

                entity.Property(e => e.Alamat)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.JenisKelamin)
                    .IsRequired()
                    .HasMaxLength(1)
                    .HasDefaultValueSql("''")
                    .IsFixedLength();

                entity.Property(e => e.KodeKabupatenKota).HasColumnType("smallint(5) unsigned");

                entity.Property(e => e.KodePos)
                    .IsRequired()
                    .HasMaxLength(5)
                    .HasDefaultValueSql("''");

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.NomorHp)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasColumnName("NomorHP")
                    .HasDefaultValueSql("''");

                entity.Property(e => e.TanggalLahir).HasDefaultValueSql("'1900-01-01'");

                entity.HasOne(d => d.KabupatenKotaNavigation)
                    .WithMany(p => p.DataKontak)
                    .HasForeignKey(d => d.KodeKabupatenKota)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_datakontak_kabupatenkota");
            });

            modelBuilder.Entity<KabupatenKota>(entity =>
            {
                entity.HasKey(e => e.Kode)
                    .HasName("PRIMARY");

                entity.ToTable("kabupatenkota");

                entity.HasIndex(e => e.KodeProvinsi, "FK_kabupaten_kota_provinsi");

                entity.Property(e => e.Kode)
                    .HasColumnType("smallint(5) unsigned")
                    .ValueGeneratedNever();

                entity.Property(e => e.KodeProvinsi).HasColumnType("tinyint(3) unsigned");

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");

                entity.HasOne(d => d.ProvinsiNavigation)
                    .WithMany(p => p.KabupatenKota)
                    .HasForeignKey(d => d.KodeProvinsi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_kabupaten_kota_provinsi");
            });

            modelBuilder.Entity<KirimWAMintaAlamat>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("kirimwamintaalamat");

                entity.HasIndex(e => e.Id, "FK_kirimwamintaalamat_datakontak");

                entity.Property(e => e.Id)
                    .HasColumnType("mediumint(8) unsigned")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.WaSent).HasColumnType("tinyint(4) unsigned");

                entity.HasOne(d => d.DataKontakNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_kirimwamintaalamat_datakontak");
            });

            modelBuilder.Entity<Provinsi>(entity =>
            {
                entity.HasKey(e => e.Kode)
                    .HasName("PRIMARY");

                entity.ToTable("provinsi");

                entity.Property(e => e.Kode).HasColumnType("tinyint(3) unsigned");

                entity.Property(e => e.Nama)
                    .IsRequired()
                    .HasColumnType("tinytext")
                    .HasDefaultValueSql("''");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
