resource "aws_ecr_repository" "server_ecr_repository" {
  name = "forum-server"
}

data "aws_iam_policy_document" "server_repository_policy_doc" {
  statement {
    sid    = "server-repository-policy-doc"
    effect = "Allow"
    principals {
      type = "AWS"
      identifiers = [
        "arn:aws:iam::575737149124:role/forum-server-deploy",
        "arn:aws:iam::575737149124:group/admin-group"
      ]
    }
    actions = ["ecr:*"]
  }
}

resource "aws_ecr_repository_policy" "server_repository_policy" {
  repository = aws_ecr_repository.server_ecr_repository.name
  policy     = data.aws_iam_policy_document.server_repository_policy_doc.json
}
