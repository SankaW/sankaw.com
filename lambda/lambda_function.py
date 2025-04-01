import os
import smtplib
import json
import traceback


def lambda_handler(event, context):
    # Add CORS headers
    headers = {
        "Access-Control-Allow-Origin": "*",  # Or specify your domain instead of *
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Content-Type": "application/json"
    }

    # Handle OPTIONS request for CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return {
            "statusCode": 200,
            "headers": headers,
            "body": ""
        }

    try:
        # If API Gateway is proxying the request, the body will be stringified
        body = json.loads(event.get("body", "{}"))

        # Validate required fields
        required_fields = ["name", "email", "message"]
        missing_fields = [
            field for field in required_fields if not body.get(field)]
        if missing_fields:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({
                    "error": "Missing required fields",
                    "missing_fields": missing_fields
                })
            }

        name = body.get("name")
        email = body.get("email")
        subject = body.get("subject", "No Subject")
        message = body.get("message", "")
        form_type = body.get("formType", "default").strip().lower()

        my_email = os.environ.get("MY_EMAIL")
        app_password = os.environ.get("APP_PASSWORD")
        # to_addrs = os.environ.get("TO_EMAIL", "sdweerathunga5@gmail.com")

        if not my_email or not app_password:
            return {
                "statusCode": 500,
                "headers": headers,
                "body": json.dumps({
                    "error": "Server configuration error",
                    "message": "Email credentials not properly configured"
                })
            }

        # Recipient mapping using formType
        recipient_mapping = {
            "nimmi": "nimmirashinika@gmail.com",
            "sanka": "sdweerathunga5@gmail.com",
            "default": "sdweerathunga5@gmail.com"
        }

        to_addrs = recipient_mapping.get(
            form_type, recipient_mapping["default"])

        # Compose email
        email_body = f"You have a new message from {name} ({email}):\n\n{message}"

        # Send email
        with smtplib.SMTP("smtp.gmail.com", 587) as connection:
            connection.starttls()
            connection.login(user=my_email, password=app_password)
            connection.sendmail(
                from_addr=my_email,
                to_addrs=to_addrs,
                msg=f"Subject:{subject}\n\n{email_body}"
            )

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "message": "Email sent successfully",
                "details": {
                    "from": name,
                    "email": email,
                    "subject": subject
                }
            })
        }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({
                "error": "Invalid JSON",
                "message": "The request body must be valid JSON"
            })
        }
    except Exception as e:
        # Log the full error for debugging
        print(f"Error: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")

        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({
                "error": "Internal server error",
                "message": "An error occurred while processing your request"
            })
        }
