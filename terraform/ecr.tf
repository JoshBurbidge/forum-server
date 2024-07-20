# resource "aws_ecr_repository" "server_ecr_repository" {
#   name = "forum-server"
# }

# resource "aws_ecr_repository_policy" "server_repository_policy" {
#   repository = aws_ecr_repository.server_ecr_repository.name
#   policy     = <<EOF
#   {
#     "Version": "2012-10-17",
#     "Statement": [
#       {
#         "Sid": "registryPolicyStatement",
#         "Effect": "Allow",
#         "Principal": {
#           "AWS": [
#             "arn:aws:iam::575737149124:root",
#             "arn:aws:iam::575737149124:user/admin",
#             "arn:aws:iam::575737149124:role/forum-server-deploy"
#           ]
#         },
#         "Action": "ecr:*"
#       }
#     ]
#   }
#   EOF
# }

# output "ecr_repo_name" {
#   value = aws_ecr_repository.server_ecr_repository.name
# }
