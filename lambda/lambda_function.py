import os
import smtplib
import json

def lambda_handler(event, context):
    # If API Gateway is proxying the request, the body will be stringified
    body = json.loads(event["body"])

    name = body.get("name")
    email = body.get("email")
    subject = body.get("subject", "No Subject")
    message = body.get("message", "")

    my_email = os.environ.get("MY_EMAIL")
    app_password = os.environ.get("APP_PASSWORD")
    to_addrs = os.environ.get("TO_EMAIL", "sdweerathunga5@gmail.com")

    email_body = f"You have a new message from {name} ({email}):\n\n{message}"

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
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"message": "Email sent successfully"})
    }
