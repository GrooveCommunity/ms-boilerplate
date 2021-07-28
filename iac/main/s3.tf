data "aws_caller_identity" "current" {}

resource "aws_s3_bucket" "sam_stack" {
  bucket = "${data.aws_caller_identity.current.account_id}-${var.project}-${var.env_name}-sam-stack"
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm     = "aws:kms"
      }
    }
  }
}


