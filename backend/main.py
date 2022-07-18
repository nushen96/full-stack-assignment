from fastapi import FastAPI
from .schemas.Release import ReleaseSchema, ReleaseSchemaCreateIn, ReleaseSchemaUpdateIn

app = FastAPI()

@app.get("/")
def home():
    return "Full Stack assignment server up and running."

@app.get("/releases/")
def get_releases():
    return "List of all releases"

@app.get("/releases/{_id}")
def get_release(_id: int):
    return f"Release with id {_id}"

@app.post("/releases/")
def create_release(data: dict):
    return "Create a release using given data"

@app.put("/releases/{_id}")
def update_release(_id: int, data: dict):
    return f"Update release with id {_id} using given data"

@app.delete("/releases/{_id}")
def delete_release(_id: int):
    return f"Delete release with id {_id}"