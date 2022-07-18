from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return "Full Stack assignment server up and running."