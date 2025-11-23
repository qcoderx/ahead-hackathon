from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel

def calculate_gestational_week(lmp: date) -> int:
    """
    Calculates the gestational week based on the Last Menstrual Period (LMP).
    """
    today = date.today()
    delta = today - lmp
    weeks = delta.days // 7
    return max(0, weeks)
