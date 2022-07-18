from typing import List, Dict
from copy import deepcopy
from ..schemas.Release import Status

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