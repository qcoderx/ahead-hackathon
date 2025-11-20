try:
    from fastapi import FastAPI
    from pydantic import BaseModel
    
    app = FastAPI()
    
    class Item(BaseModel):
        name: str
        
    print("FastAPI and Pydantic imported successfully")
    print(f"Pydantic Version: {import_module('pydantic').VERSION}")
except Exception as e:
    import traceback
    traceback.print_exc()

from importlib import import_module
