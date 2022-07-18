from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum
from pydantic import BaseModel

class Status(str, Enum):
	planned= "planned"
	ongoing= "ongoing"
	done= "done"

class ReleaseSchemaUpdateIn(BaseModel):
    name: Optional[str]
    date: Optional[datetime]
    additional_info: Optional[str]
    steps: Optional[List[Dict]]

class ReleaseSchemaCreateIn(BaseModel):
    name: str
    date: datetime = datetime.now()
    additional_info: Optional[str]
    status: Status = Status.planned
    steps: List[Dict] = [{"label": "All relevant Github pull requests have been merged", "status": "off"},
		{"label": "CHANGELOG.md files have been updated", "status": "off"},
		{"label": "All tests are passing", "status": "off"},
		{"label": "Releases in Github created", "status": "off"},
		{"label": "Deployed in demo", "status": "off"},
		{"label": "Tested thoroughly in demo", "status": "off"},
		{"label": "Deployed in production", "status": "off"},
	]

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