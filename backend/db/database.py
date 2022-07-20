import databases
from sqlalchemy import create_engine
from starlette.config import Config

config = Config(".env")

user = config("DB_USER")
passwd = config("MYSQL_ROOT_PASSWORD")
host = config("MYSQL_HOST_IP")
port:int = config("DB_PORT", cast=int)
db = config("MYSQL_DATABASE")

connection_string = 'mysql+pymysql://{}:{}@{}:{}'.format(user, passwd, host, port)
db_connection_string = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(user, passwd, host, port, db)

# Create the database if it doesn't exist
try:
    mysql_engine = create_engine(connection_string)
    existing_databases = mysql_engine.execute("SHOW DATABASES;")
    existing_databases = [d[0] for d in existing_databases]
    if db not in existing_databases:
        mysql_engine.execute("CREATE DATABASE {0}".format(db))
        print("Created database {0}".format(db))
except:
    print("Unable to connect to mysql host")

DATABASE_URL = db_connection_string
database = databases.Database(DATABASE_URL)