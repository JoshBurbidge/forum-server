resource "aws_lb" "main_alb" {
  name               = "main-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = data.aws_security_groups.default_vpc_sgs.ids
  subnets            = data.aws_subnets.subnets.ids


  tags = local.tags
}

resource "aws_lb_listener" "lb_listener_http" {
  load_balancer_arn = aws_lb.main_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      status_code  = 200
      content_type = "text/plain"
      message_body = "Hello from Load Balancer listener default action"
    }
  }
}

resource "aws_lb_listener_rule" "test_rule" {
  listener_arn = aws_lb_listener.lb_listener_http.arn
  priority     = 100

  action {
    type = "fixed-response"
    fixed_response {
      status_code  = 200
      content_type = "text/plain"
      message_body = "2"
    }
  }

  condition {
    query_string {
      key   = "foo2"
      value = "bar2"
    }
  }
}

resource "aws_lb_listener_rule" "test_rule_2" {
  listener_arn = aws_lb_listener.lb_listener_http.arn
  priority     = 100

  action {
    type = "fixed-response"
    fixed_response {
      status_code  = 200
      content_type = "text/plain"
      message_body = "Oy"
    }
  }

  condition {
    query_string {
      key   = "foo"
      value = "bar"
    }
  }
}


resource "aws_lb_listener_rule" "forum_server_forward_rule" {
  listener_arn = aws_lb_listener.lb_listener_http.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.forum_server_tg.arn
  }

  condition {
    path_pattern {
      values = ["*"]
    }
  }
}
