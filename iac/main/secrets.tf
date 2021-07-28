resource "aws_kms_key" "lambda_environment" {
  description             = "${var.project}/${var.env_name} lambda environment"
  deletion_window_in_days = 10
}
