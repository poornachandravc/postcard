package repository

import (
	"fmt"

	"github.com/poornachandravc/postcard/postcard-service/pkg/models"
)

type PostRepository interface {
	SavePost(post *models.Post) error
	// GetPost(id string) (*models.Post, error)
	// UpdatePost(id string, post *models.Post) error
	// DeletePost(id string) error
}

type postRepository struct {
}

func NewPostRepository() PostRepository {
	return &postRepository{}
}

func (pr *postRepository) SavePost(post *models.Post) error {
	fmt.Println("Saving post")
	return nil
}
