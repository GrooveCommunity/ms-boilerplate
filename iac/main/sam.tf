locals {
  sam_parameters = {
    Project = var.project
    EnvName = var.env_name
    ExampleEnv = var.example_env
    KmsKeyArn = aws_kms_key.lambda_environment.arn
    JwtSecret = var.jwt_secret
  }

  parameter_overrides = join(" ", [ for k, v in local.sam_parameters : "${k}=${v}" ])
}

resource "local_file" "sam" {
    content     = local.parameter_overrides
    filename = "${var.function_root}/../sam-params"
}
