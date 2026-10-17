package main

import (
	"log"
	"time"
	"workshop-backend/controllers"
	"workshop-backend/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Inisialisasi Database SQLite & Seeding
	database.InitDB()

	r := gin.Default()

	// Setup CORS Terbuka untuk Vite Dev Server
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Static route untuk melayani file upload gambar
	r.Static("/uploads", "./uploads")

	// API Routes Group
	v1 := r.Group("/api/v1")
	{
		// Section content routes
		v1.GET("/contents", controllers.GetAllContents)
		v1.GET("/contents/:section_key", controllers.GetContentByKey)
		v1.PUT("/contents/:section_key", controllers.UpdateContentByKey)

		// File upload route
		v1.POST("/upload", controllers.UploadImage)

		// Contact messages routes
		v1.GET("/contacts", controllers.GetAllContacts)
		v1.POST("/contacts", controllers.CreateContact)
		v1.DELETE("/contacts/:id", controllers.DeleteContact)
	}

	log.Println("Backend server running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Server gagal dijalankan: %v", err)
	}
}
