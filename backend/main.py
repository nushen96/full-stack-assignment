from fastapi import FastAPI
from .schemas.Release import ReleaseSchema, ReleaseSchemaCreateIn, ReleaseSchemaUpdateIn
from .db.database import database
from .models.release_model import releases
from typing import List

app = FastAPI()

@app.on_event('startup')
async def startup():
    await database.connect()

@app.on_event('shutdown')
async def shutdown():
    await database.disconnect()

@app.get("/")
def home():
    return "Full Stack assignment server up and running."

@app.get("/releases/", response_model=List[ReleaseSchema])
async def get_releases():
    query = releases.select()
    return await database.fetch_all(query)

@app.get("/releases/{_id}")
def get_release(_id: int):
    return f"Release with id {_id}"

@app.post("/releases/", response_model=ReleaseSchema)
async def create_release(release: ReleaseSchemaCreateIn):
    query = releases.insert().values(**release.dict())
    last_record_id = await database.execute(query)
    return {**release.dict(), "id": last_record_id}

@app.put("/releases/{_id}")
def update_release(_id: int, data: dict):
    return f"Update release with id {_id} using given data"

@app.delete("/releases/{_id}")
def delete_release(_id: int):
    return f"Delete release with id {_id}"