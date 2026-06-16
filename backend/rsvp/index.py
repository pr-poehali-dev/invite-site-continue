import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

RECIPIENTS = ["ttuzagash@mail.ru", "aelita.diyatova7579@gmail.com"]

def handler(event, context):
    """Отправка RSVP-подтверждения на почту жениха и невесты"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    attending = body.get('attending', '').strip()
    wish = body.get('wish', '').strip()

    if not name or not attending:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Имя и ответ обязательны'})}

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.mail.ru')
    smtp_user = os.environ['SMTP_USER']
    smtp_pass = os.environ['SMTP_PASSWORD']

    subject = f"💌 RSVP от {name}"
    html = f"""
    <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #2A251E;">
      <div style="background: #FAF6EF; border: 1px solid rgba(42,37,30,0.1); border-radius: 4px; padding: 36px;">
        <p style="font-size: 22px; margin-bottom: 20px;">💌 Новый ответ на приглашение</p>
        <hr style="border: none; border-top: 1px solid rgba(42,37,30,0.1); margin-bottom: 20px;" />
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Ответ:</strong> {attending}</p>
        {"<p><strong>Пожелание:</strong> " + wish + "</p>" if wish else ""}
      </div>
    </div>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = ', '.join(RECIPIENTS)
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, 465) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, RECIPIENTS, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'ok': True})
    }
