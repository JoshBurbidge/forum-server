resource "aws_ecr_repository" "server_ecr_repository" {
  name = "forum-server"
}

# data "aws_iam_policy_document" "server_repository_policy_doc" {
#   statement {
#     effect = "Allow"
#     principals {
#       type = "AWS"
#       identifiers = [
#         "arn:aws:iam::575737149124:role/forum-server-deploy",
#         "arn:aws:iam::575737149124:group/admin-group",
#         "arn:aws:iam::575737149124:root"
#       ]
#     }
#     actions = ["ecr:*"]
#   }
# }

resource "aws_ecr_repository_policy" "server_repository_policy" {
  repository = aws_ecr_repository.server_ecr_repository.name
  policy     = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "registryPolicyStatement",
        "Effect": "Allow",
        "Principal": {
          "AWS": [
            "arn:aws:iam::575737149124:root",
            "arn:aws:iam::575737149124:user/admin",
            "arn:aws:iam::575737149124:role/forum-server-deploy"
          ]
        },
        "Action": "ecr:*"
      }
    ]
  }
  EOF
}
