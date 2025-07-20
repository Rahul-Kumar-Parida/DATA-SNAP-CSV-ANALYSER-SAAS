from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from app.analysis import analyze_file

app = FastAPI()

# Allow frontend to connect (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://data-snap-csv-analyser-saas.vercel.app"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    result = await analyze_file(file)
    return result

@app.get("/")
def read_root():
    return {"message": "Welcome to DataSnap CSV Analyzer API! Visit /docs for API documentation."}