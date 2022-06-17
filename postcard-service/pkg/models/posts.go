package models

type Post struct {
	ID        string `json:"id"`
	Message   string `json:"message"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}
