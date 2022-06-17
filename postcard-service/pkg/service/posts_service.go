package service

import (
	"github.com/poornachandravc/postcard/postcard-service/pkg/models"
	"github.com/poornachandravc/postcard/postcard-service/pkg/repository"
)

type PostsService interface {
	SavePosts(post *models.PostRequest) (*models.Post, error)
}

type postsService struct {
	postRepository repository.PostRepository
}

func NewPostsService(repo repository.PostRepository) PostsService {
	return &postsService{
		postRepository: repo,
	}
}

func (ps *postsService) SavePosts(postRequest *models.PostRequest) (*models.Post, error) {

	post := models.Post{
		ID:        "",
		Message:   postRequest.Message,
		CreatedAt: "",
		UpdatedAt: "",
	}
	ps.postRepository.SavePost(&post)
	return &post, nil

}
