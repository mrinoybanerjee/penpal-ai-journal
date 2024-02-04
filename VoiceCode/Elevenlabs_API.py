# Send a message to that bot and have the bot respond with a voice message in mp3 format
# API call: https://elevenlabs.io/docs/api-reference/text-to-speech

import requests

# text for the voice to say
text = "Hello Jared Bailey"

# elevenlabs xi-api-key
api_key = '' # included in separate message

# elevenlabs voice_id
voice_id = '' # included in separate message

# url for the API call
url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

payload = {
    "text": f"{text}", # this is what the voice will say
    "voice_settings": {
        "similarity_boost": 1,
        "stability": 0
    }
}
headers = {
    "xi-api-key": f"{api_key}",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, json=payload, headers=headers)

CHUNK_SIZE = 1024
with open('output.mp3', 'wb') as f:
    for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
        if chunk:
            f.write(chunk)
