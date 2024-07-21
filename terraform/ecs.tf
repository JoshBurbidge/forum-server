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
  # iam_role        = aws_iam_role.foo.arn # maybe don't need this? only need to define a task role on the task def?
  # depends_on      = [aws_iam_role_policy.foo]

  network_configuration {
    subnets          = [data.aws_subnet.subnet.id]
    assign_public_ip = true
  }

  ordered_placement_strategy {
    type  = "binpack"
    field = "cpu"
  }

  lifecycle {
    ignore_changes = [desired_count]
  }

  tags = local.tags
}

resource "aws_ecs_task_definition" "task" {
  family             = "forum-server-task"
  execution_role_arn = data.aws_iam_role.task_exec_role.arn
  network_mode       = "awsvpc"
  cpu                = 256
  memory             = 512
  container_definitions = jsonencode([
    {
      name      = "forum-server"
      image     = "nginx:latest"
      essential = true
      portMappings = [
        {
          containerPort = 8080
          hostPort      = 8080
        }
      ]
    }
  ])
  tags = local.tags
}
