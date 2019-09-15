import w1thermsensor
import requests
import subprocess

sensor = w1thermsensor.W1ThermSensor()

temp = sensor.get_temperature()
print(temp)
cpu_temp = float(subprocess.run(["bash", "/home/pi/internalt.sh"], stdout=subprocess.PIPE).stdout.decode('utf-8'))

url = "https://europe-west1-brewing2.cloudfunctions.net/logger"
payload = { "temp": temp, "cpu_temp": cpu_temp }

response = requests.post(url, json=payload, headers={ "Authorization": "PASSWORD_HERE" })
print(response.text)