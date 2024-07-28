terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.60"
    }
  }
  backend "s3" {
    bucket = "575737149124-terraform-backend"
    key    = "forum-server/tfstate"
    region = "us-east-1"
  }

  required_version = ">= 1.9.2"
}

locals {
  app_name = "forum-server"
  tags = {
    app = local.app_name
  }
}

provider "aws" {
  region = "us-east-1"
}

output "db_master_user_secret" {
  value = aws_db_instance.db_instance.master_user_secret[0].secret_arn
}

output "db_endpoint" {
  value = aws_db_instance.db_instance.address
}
