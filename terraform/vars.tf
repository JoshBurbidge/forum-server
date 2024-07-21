variable "repository_name" {
  description = "ECR repository name that stores the images for ECS"
  type        = string
  default     = "forum-server"
}

variable "git_commit_sha" {
  description = "the git commit that triggered the deployment"
  type        = string
}
