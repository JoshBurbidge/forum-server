
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "src/app.js"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "test_lambda" {
  filename      = "lambda_function_payload.zip"
  function_name = "test_lambda"
  role          = "arn:aws:iam::575737149124:role/BasicLambdaExecutionRole"
  runtime       = "nodejs18.x"
  handler       = "index.handler"
}

data "aws_lambda_function" "test" {
  function_name = "test2"
}
