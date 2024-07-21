resource "aws_ecs_cluster" "cluster" {
  name = local.app_name

  tags = local.tags
}

resource "aws_ecs_cluster_capacity_providers" "example" {
  cluster_name = aws_ecs_cluster.cluster.name

  capacity_providers = ["FARGATE"]

  default_capacity_provider_strategy {
    base              = 1
    weight            = 100
    capacity_provider = "FARGATE"
  }
}

resource "aws_ecs_service" "service" {
  name            = local.app_name
  launch_type     = "FARGATE"
  cluster         = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = 1

  network_configuration {
    # multiple subnets means it can create tasks in each subnet
    # so if you have multiple tasks you can have tasks in multiple subnets
    subnets          = data.aws_subnets.subnets.ids
    assign_public_ip = true
  }

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = local.tags
}

resource "aws_cloudwatch_log_group" "log_group" {
  name              = "${local.app_name}-ecs"
  retention_in_days = 3

  tags = local.tags
}

resource "aws_ecs_task_definition" "task" {
  family             = "forum-server-task"
  execution_role_arn = data.aws_iam_role.task_exec_role.arn
  task_role_arn      = data.aws_iam_role.task_exec_role.arn
  network_mode       = "awsvpc"
  cpu                = 256
  memory             = 512
  container_definitions = jsonencode([
    {
      name      = "forum-server"
      image     = "${data.aws_ecr_repository.repository.repository_url}:${var.git_commit_sha}"
      essential = true
      environment = [{
        name  = "NODE_ENV"
        value = "deployed"
      }]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          "awslogs-group"         = "${aws_cloudwatch_log_group.log_group.name}",
          "awslogs-region"        = "us-east-1",
          "awslogs-stream-prefix" = "ecs"
        }
      }
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
        }
      ]
    }
  ])
  tags = local.tags
}
