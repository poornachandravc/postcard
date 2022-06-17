package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/poornachandravc/postcard/postcard-service/pkg/models"
	"github.com/poornachandravc/postcard/postcard-service/pkg/repository"
	"github.com/poornachandravc/postcard/postcard-service/pkg/service"
)

// importatnt link : https://github.com/golang-standards/project-layout

// postService variable
var postService service.PostsService

// main function
func main() {
	// create a new echo instance
	e := echo.New()
	initialize()

	e.POST("/posts", savePost)
	e.GET("/posts/:id", getPost)
	e.PUT("/posts/:id", putPost)
	e.DELETE("/posts/:id", deletePost)

	e.Logger.Fatal(e.Start(":8000"))
	fmt.Println("Hello, World!")
}

// initialize function
func initialize() {
	// initialize the repository
	repo := repository.NewPostRepository()
	// initialize the service
	postService = service.NewPostsService(repo)
}

// savePost function
func savePost(c echo.Context) error {

	// decode the request body into a post struct
	postRequest := models.PostRequest{}
	defer c.Request().Body.Close()
	err := json.NewDecoder(c.Request().Body).Decode(&postRequest)
	if err != nil {
		fmt.Errorf("failed reading the request body %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error)
	}

	post, err := postService.SavePosts(&postRequest)
	if err != nil {
		fmt.Errorf("failed saving the post %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error)
	}

	// marshal the post into json and send it to the client
	json, err := json.Marshal(post)
	if err != nil {
		fmt.Errorf("failed marshalling the post %s", err)
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error)
	}
	return c.JSONBlob(http.StatusOK, json)
}

// getPost function
func getPost(c echo.Context) error {
	id := c.Param("id")
	return c.String(http.StatusOK, id)
}

// putPost function
func putPost(c echo.Context) error {
	return nil
}

// deletePost function
func deletePost(c echo.Context) error {
	return nil
}
