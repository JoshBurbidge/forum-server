data "aws_vpc" "default_vpc" {
  filter {
    name   = "is-default"
    values = [true]
  }
}

data "aws_subnets" "subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }
}

data "aws_security_groups" "default_vpc_sgs" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }
}

output "default_vpc" {
  value = data.aws_vpc.default_vpc.id
}

output "subnets" {
  value = data.aws_subnets.subnets.ids
}
