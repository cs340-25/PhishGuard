import email
import re
import pandas as pd
from bs4 import BeautifulSoup

def parse_email(raw_email):
    msg = email.message_from_string(raw_email)

    sender = msg.get('From')
    receiver = msg.get('To')
    date = msg.get('Date')
    subject = msg.get('Subject')

    body = ""
    if msg.is_multipart():
        for part in msg.walk():
            content_type = part.get_content_type()
            if content_type == "text/plain":
                body += part.get_payload(decode=True).decode(errors="ignore")
            elif content_type == "text/html":
                html = part.get_payload(decode=True).decode(errors="ignore")
                body += BeautifulSoup(html, 'html.parser').get_text()
    else:
        body = msg.get_payload(decode=True).decode(errors="ignore")

    urls = 1 if re.search(r'https?://\S+', body) else 0

    data = {
        "sender": [sender],
        "receiver": [receiver],
        "date": [date],
        "subject": [subject],
        "body": [body.strip()],
        "contains_url": [urls]
    }

    return pd.DataFrame(data)

def main():
    file_path = "url.eml"
    with open(file_path, "r", encoding="utf-8") as f:
        raw_email = f.read()

    df = parse_email(raw_email)
    print(df)

if __name__ == "__main__":
    main()

