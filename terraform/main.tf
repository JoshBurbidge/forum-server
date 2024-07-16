terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.58"
    }
  }
  backend "s3" {
    bucket = "575737149124-terraform-backend"
    key    = "forum-server/tfstate"
    region = "us-east-1"
  }

  required_version = ">= 1.9.2"
}

provider "aws" {
  region = "us-east-1"
}
