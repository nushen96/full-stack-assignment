from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, DateTime, PickleType
from ..db.database import DATABASE_URL

metadata = MetaData()
releases = Table(
    "releases",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(1024), nullable=False),
    Column("date", DateTime, nullable=False),
    Column("status", String(1024), nullable=False),
    Column("additional_info", String(1024)),
    Column("steps", PickleType, nullable=False)
)

engine = create_engine(
    DATABASE_URL
)
metadata.create_all(engine)