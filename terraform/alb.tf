data "aws_lb" "main_lb_data" {
  name = "main-lb"
}

data "aws_lb_listener" "lb_https_listener" {
  load_balancer_arn = data.aws_lb.main_lb_data.arn
  port              = 443
}

resource "aws_lb_listener_rule" "forum_server_forward_rule_https" {
  listener_arn = data.aws_lb_listener.lb_https_listener.arn
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.forum_server_tg.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}
