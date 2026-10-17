package models

import (
	"time"
)

type Content struct {
	ID          uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	SectionKey  string    `gorm:"size:50;uniqueIndex;not null" json:"section_key"`
	SectionName string    `gorm:"size:100;not null" json:"section_name"`
	Title       string    `gorm:"size:255;not null" json:"title"`
	Subtitle    string    `gorm:"size:255" json:"subtitle"`
	Body        string    `gorm:"type:text" json:"body"`
	ImageURL    string    `gorm:"size:500" json:"image_url"`
	IsActive    int       `gorm:"default:1" json:"is_active"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type UpdateContentRequest struct {
	Title    string `json:"title"`
	Subtitle string `json:"subtitle"`
	Body     string `json:"body"`
	ImageURL string `json:"image_url"`
	IsActive *int   `json:"is_active"`
}

// ContactMessage merepresentasikan pesan/formulir kontak dari pengunjung landing page
type ContactMessage struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Name      string    `gorm:"size:255;not null" json:"name"`
	Email     string    `gorm:"size:255;not null" json:"email"`
	Service   string    `gorm:"size:255" json:"service"`
	Message   string    `gorm:"type:text;not null" json:"message"`
	CreatedAt time.Time `json:"created_at"`
}
