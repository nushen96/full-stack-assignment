from fastapi import FastAPI, HTTPException
from .schemas.Release import Status, ReleaseSchema, ReleaseSchemaCreateIn, ReleaseSchemaUpdateIn
from .db.database import database
from .models.release_model import releases
from typing import List, Dict
from copy import deepcopy

def count_completed_steps(steps: List[Dict]):
	return len([step for step in steps if step["status"]=="on"])

def update_release_status(release: Dict):
    new_release = deepcopy(release)
    num_completed_steps = count_completed_steps(new_release["steps"])
    if num_completed_steps == len(new_release["steps"]):
        new_release["status"] = Status.done
    elif num_completed_steps > 0:
        new_release["status"] = Status.ongoing
    else:
        new_release["status"] = Status.planned
    return new_release

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

@app.get("/releases/{_id}", response_model=ReleaseSchema)
async def get_release(_id: int):
    desired_release = await database.fetch_one(releases.select().where(releases.c.id == _id))
    if not desired_release:
        raise HTTPException(status_code=404, detail=f"Release with id {_id} not found")
    return desired_release

@app.post("/releases/", response_model=ReleaseSchema)
async def create_release(release: ReleaseSchemaCreateIn):
    query = releases.insert().values(**release.dict())
    last_record_id = await database.execute(query)
    return {**release.dict(), "id": last_record_id}

@app.put("/releases/{_id}", response_model=ReleaseSchema)
async def update_release(_id: int, release:ReleaseSchemaUpdateIn):
    desired_release = await database.fetch_one(releases.select().where(releases.c.id == _id))
    if not desired_release:
        raise HTTPException(status_code=404, detail=f"Release with id {_id} not found")
    release_dict = release.dict(exclude_none=True)
    if "steps" in release_dict:
        new_release = update_release_status(release_dict)
    else:
        new_release = release_dict
    query = releases.update().where(releases.c.id == _id).values(**new_release)
    await database.execute(query)
    updated_release = await database.fetch_one(releases.select().where(releases.c.id == _id))
    return updated_release

@app.delete("/releases/{_id}")
def delete_release(_id: int):
    return f"Delete release with id {_id}"