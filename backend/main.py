from fastapi import FastAPI
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum
from pydantic import BaseModel

app = FastAPI()

class Status(str, Enum):
	planned= "planned"
	ongoing= "ongoing"
	done= "done"

class ReleaseSchema(BaseModel):
    id: int
    name: str
    date: datetime = datetime.now()
    status: Status = Status.planned
    additional_info: Optional[str]
    steps: List[Dict] = [{"label": "All relevant Github pull requests have been merged", "status": "off"},
		{"label": "CHANGELOG.md files have been updated", "status": "off"},
		{"label": "All tests are passing", "status": "off"},
		{"label": "Releases in Github created", "status": "off"},
		{"label": "Deployed in demo", "status": "off"},
		{"label": "Tested thoroughly in demo", "status": "off"},
		{"label": "Deployed in production", "status": "off"},
	]

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