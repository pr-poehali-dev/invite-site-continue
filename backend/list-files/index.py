import boto3
import os
import json

def handler(event, context):
    """Список файлов в S3 для поиска аудио"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    files = []
    for bucket in ['files', 'bucket']:
        try:
            result = s3.list_objects_v2(Bucket=bucket)
            for obj in result.get('Contents', []):
                files.append({'bucket': bucket, 'key': obj['Key'], 'size': obj['Size']})
        except Exception as e:
            files.append({'bucket': bucket, 'error': str(e)})

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        'body': json.dumps({'files': files})
    }