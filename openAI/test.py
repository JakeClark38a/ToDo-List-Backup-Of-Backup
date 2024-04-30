OPENAI_ORG = "org-Lb8KJfHPPbdGSPw99vtvh3QY"
from openai import OpenAI
import os

client = OpenAI(
    api_key="sk-proj-l5ysixGrkfNzkvHGoCAKT3BlbkFJdJtE3bMU2isoATfBRxWb",
    )

completion = client.chat.completions.create(
    model="gpt-3.5",
    messages=[
    {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
    {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming."}
        ]
    )

print(completion.choices[0].message)