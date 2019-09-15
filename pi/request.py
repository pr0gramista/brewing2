import requests

url = "https://europe-west1-brewing2.cloudfunctions.net/logger"

payload = { "temp": "301" }
headers = {
    'Authorization': "PASSWORD_HERE"
    }

response = requests.post(url, json=payload, headers=headers)

print(response.text)