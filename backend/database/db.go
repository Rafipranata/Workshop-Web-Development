package database

import (
	"log"
	"time"
	"workshop-backend/models"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() *gorm.DB {
	var err error
	DB, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		log.Fatalf("Gagal menghubungkan ke database SQLite: %v", err)
	}

	// Auto Migrate skema tabel contents dan contact_messages
	err = DB.AutoMigrate(&models.Content{}, &models.ContactMessage{})
	if err != nil {
		log.Fatalf("Gagal migrasi skema database: %v", err)
	}

	// Seed Initial Content Data jika belum ada
	seedContents(DB)

	return DB
}

func seedContents(db *gorm.DB) {
	initialContents := []models.Content{
		{
			SectionKey:  "beranda",
			SectionName: "Konten Beranda",
			Title:       "Membangun Fondasi Masa Depan dengan Presisi dan Kualitas",
			Subtitle:    "SOLUSI BANGUNAN TERPERCAYA",
			Body:        "Kami mewujudkan visi arsitektur dan hunian impian Anda melalui standar pengerjaan konstruksi terbaik, material premium, dan tenaga ahli berpengalaman.",
			ImageURL:    "/src/images/background-herosection.png",
			IsActive:    1,
			UpdatedAt:   time.Now(),
		},
		{
			SectionKey:  "about",
			SectionName: "Tentang Kami",
			Title:       "Membangun Hunian untuk Kenyamanan dan Masa Depan Anda",
			Subtitle:    "TENTANG TITAN KONSTRUKSI",
			Body:        "Kami adalah kontraktor terkemuka yang bergerak di bidang konstruksi sipil, renovasi bangunan, dan fabrikasi atap modern dengan komitmen garansi pengerjaan berkualitas tinggi dan material berstandar internasional.",
			ImageURL:    "/src/images/gambar-tentangkami1.png",
			IsActive:    1,
			UpdatedAt:   time.Now(),
		},
		{
			SectionKey:  "layanan",
			SectionName: "Layanan Kami",
			Title:       "Solusi Konstruksi Menyeluruh dari Konsep hingga Serah Terima",
			Subtitle:    "Layanan Kami",
			Body:        "Instalasi sistem atap metal presisi tinggi, genteng aspal premium, pemasangan atap baru, serta perawatan struktur atap dengan standar SNI dan bergaransi resmi.",
			ImageURL:    "/src/images/atapmetal.png",
			IsActive:    1,
			UpdatedAt:   time.Now(),
		},
		{
			SectionKey:  "portofolio",
			SectionName: "Portofolio",
			Title:       "Pengalaman kerja sama yang luar biasa! Pengerjaan rapi, tim komunikatif, dan hasil akhir melebihi ekspektasi.",
			Subtitle:    "Membangun Reputasi Nyata Hasil Kerja dan Komitmen Kami untuk Kenyamanan dan Masa Depan Anda",
			Body:        "Hendri Kurniawan - CEO Solusi Properti Utama. Kumpulan proyek konstruksi perumahan, gedung komersial, dan instalasi atap modern berstandar prima.",
			ImageURL:    "/src/images/gambarportofolio.png",
			IsActive:    1,
			UpdatedAt:   time.Now(),
		},
	}

	for _, item := range initialContents {
		var count int64
		db.Model(&models.Content{}).Where("section_key = ?", item.SectionKey).Count(&count)
		if count == 0 {
			if err := db.Create(&item).Error; err != nil {
				log.Printf("Gagal seed content %s: %v", item.SectionKey, err)
			} else {
				log.Printf("Seeded default content untuk section: %s", item.SectionKey)
			}
		}
	}
}
