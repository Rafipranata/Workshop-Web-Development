package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"
	"workshop-backend/database"
	"workshop-backend/models"

	"github.com/gin-gonic/gin"
)

// GetAllContents mengembalikan seluruh data section
func GetAllContents(c *gin.Context) {
	var contents []models.Content
	if err := database.DB.Order("id ASC").Find(&contents).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data konten"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": contents,
	})
}

// GetContentByKey mengembalikan konten berdasarkan section_key (beranda, about, layanan, portofolio)
func GetContentByKey(c *gin.Context) {
	sectionKey := c.Param("section_key")
	var content models.Content
	if err := database.DB.Where("section_key = ?", sectionKey).First(&content).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Section tidak ditemukan"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": content,
	})
}

// UpdateContentByKey memperbarui konten berdasarkan section_key
func UpdateContentByKey(c *gin.Context) {
	sectionKey := c.Param("section_key")
	var content models.Content
	if err := database.DB.Where("section_key = ?", sectionKey).First(&content).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Section tidak ditemukan"})
		return
	}

	var req models.UpdateContentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format payload tidak valid: " + err.Error()})
		return
	}

	updates := map[string]interface{}{
		"title":      req.Title,
		"subtitle":   req.Subtitle,
		"body":       req.Body,
		"image_url":  req.ImageURL,
		"updated_at": time.Now(),
	}

	if req.IsActive != nil {
		updates["is_active"] = *req.IsActive
	}

	if err := database.DB.Model(&content).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal memperbarui data: " + err.Error()})
		return
	}

	// Reload updated content
	database.DB.First(&content, content.ID)

	c.JSON(http.StatusOK, gin.H{
		"message": "Konten berhasil diperbarui",
		"data":    content,
	})
}

// ==================== UPLOAD IMAGE CONTROLLER ====================

// UploadImage mengunggah file gambar ke folder uploads dan mengembalikan URL-nya
func UploadImage(c *gin.Context) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tidak ada file gambar yang diunggah"})
		return
	}

	// Buat folder uploads jika belum ada
	uploadsDir := "./uploads"
	if err := os.MkdirAll(uploadsDir, os.ModePerm); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membuat direktori upload"})
		return
	}

	// Buat nama file unik dengan timestamp
	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	dst := filepath.Join(uploadsDir, filename)

	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan file gambar"})
		return
	}

	imageURL := fmt.Sprintf("http://localhost:8080/uploads/%s", filename)
	c.JSON(http.StatusOK, gin.H{
		"message":   "Gambar berhasil diunggah",
		"image_url": imageURL,
	})
}

// ==================== CONTACT MESSAGES CONTROLLER ====================

// GetAllContacts mengembalikan seluruh pesan kontak yang masuk (urut terbaru)
func GetAllContacts(c *gin.Context) {
	var messages []models.ContactMessage
	if err := database.DB.Order("created_at DESC, id DESC").Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data pesan kontak"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": messages,
	})
}

// CreateContact menyimpan pesan baru yang di-submit dari landing page
func CreateContact(c *gin.Context) {
	var msg models.ContactMessage
	if err := c.ShouldBindJSON(&msg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Format formulir tidak valid: " + err.Error()})
		return
	}

	if msg.Name == "" || msg.Email == "" || msg.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nama, email, dan pesan wajib diisi"})
		return
	}

	msg.CreatedAt = time.Now()
	if err := database.DB.Create(&msg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan pesan: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Pesan berhasil dikirim",
		"data":    msg,
	})
}

// DeleteContact menghapus pesan kontak berdasarkan ID
func DeleteContact(c *gin.Context) {
	id := c.Param("id")
	var msg models.ContactMessage
	if err := database.DB.First(&msg, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pesan tidak ditemukan"})
		return
	}

	if err := database.DB.Delete(&msg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menghapus pesan: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Pesan kontak berhasil dihapus",
		"id":      id,
	})
}
