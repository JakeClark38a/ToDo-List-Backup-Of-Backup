FROM python:3.10-slim-buster

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

#EXPOSE 1337

CMD ["python3","-m","flask","--app=/app/board/app.py","run","--host=0.0.0.0"]
