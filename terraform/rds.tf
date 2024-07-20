resource "aws_db_instance" "db_instance" {
  identifier                  = "forum-db-instance"
  allocated_storage           = 10
  db_name                     = "forum"
  engine                      = "mysql"
  engine_version              = "8.0"
  instance_class              = "db.t3.micro"
  username                    = "masteruser"
  manage_master_user_password = true
  parameter_group_name        = "default.mysql8.0"
  skip_final_snapshot         = true
  publicly_accessible         = true
}
