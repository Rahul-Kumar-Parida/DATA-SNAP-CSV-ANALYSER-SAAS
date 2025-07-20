
# 📊 DataSnap CSV Analyzer – SaaS Full Stack Project

DataSnap is a SaaS web application that allows users to upload CSV or Excel files and instantly receive a detailed, human-readable data analysis report. It's built with modern tech for speed, simplicity, and scalability—ready for future enhancements like user login, billing, and dashboards.

---

## 🚀 Features

- Upload CSV or Excel files (`.csv`, `.xls`, `.xlsx`)
- Automatic data profiling:
  - Missing values (nulls)
  - Data types
  - Summary statistics (min, max, mean, median, mode, sum, count, unique)
  - Most frequent values (top 5)
  - All-null and all-unique column detection
  - Mixed data type column warnings
  - Top 5 rows preview
- Human-readable text summary
- Copy-to-clipboard for all outputs
- Responsive design (mobile, tablet, desktop)
- Loading spinner with timer
- Navbar (Home, Contact), footer, and branding

---

## 🧑‍💻 Tech Stack

| Layer       | Technology                   |
|-------------|------------------------------|
| Frontend    | React, Axios, CSS Modules    |
| Backend     | FastAPI (Python), Pandas, NumPy |
| Deployment  | Vercel (frontend), Render (backend) |
| Versioning  | Git & GitHub                 |

---

## 📁 Folder Structure

```
project-root/
│
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI setup
│   │   └── analysis.py      # Data analysis logic
│   └── requirements.txt
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx / Navbar.css
│       │   ├── FileUpload.jsx / FileUpload.css
│       │   ├── SummaryReport.jsx / SummaryReport.css
│       │   └── Footer.jsx / Footer.css
│       ├── App.jsx / App.css
│       └── index.js / index.css
```

---

## 🔁 How It Works

1. User uploads a CSV/Excel file from the React frontend.
2. Axios sends the file to the FastAPI backend (`/analyze/` endpoint).
3. Backend:
   - Parses the file using Pandas
   - Analyzes data and returns:
     - Text summary
     - Table stats per column
     - Top 5 rows
4. Frontend displays all results clearly with responsive design.

---

## ⚙️ Local Setup

### Backend (FastAPI)

```bash
cd backend
python -m venv venv         # Optional
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# Runs at http://127.0.0.1:8000
```

### Frontend (React)

```bash
cd frontend
npm install
npm start
# Runs at http://localhost:3000
```

---

## 🌍 Deployment

### Backend (Render)

1. Push `backend/` to GitHub.
2. Create a Web Service at [Render](https://render.com/).
3. Set:
   - Root directory: `backend`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port 10000`

### Frontend (Vercel)

1. Push `frontend/` to GitHub.
2. Deploy via [Vercel](https://vercel.com/):
   - Build command: `npm run build`
   - Output dir: `build`

### Connect Frontend to Backend

- Update `FileUpload.jsx` with your **Render backend URL**
- Configure CORS in FastAPI to allow your **Vercel frontend domain**

---

## 🧪 Usage

1. Open deployed site.
2. Upload CSV or Excel file.
3. Click **Analyze**.
4. View:
   - Text summary
   - Per-column stats
   - Table preview
5. Use **Copy** buttons as needed.

---

## 🧱 Code Highlights

| File                         | Role                                    |
|------------------------------|------------------------------------------|
| `main.py`                    | FastAPI app & CORS setup                |
| `analysis.py`                | Pandas-based data profiling             |
| `FileUpload.jsx`             | File input form + POST request          |
| `SummaryReport.jsx`          | Displays results with copy buttons      |
| `Navbar.jsx`, `Footer.jsx`  | UI structure                            |
| `*.css`                      | Responsive design                       |

---

## 📱 Responsiveness

- Mobile/tablet-friendly layout
- Scrollable tables and summaries
- Adaptive navbar/footer
- Smooth animations for spinner and results

---

## 🚧 Future Enhancements

- ✅ User authentication (Auth0, Firebase, JWT)
- ✅ User dashboards & analysis history
- ✅ Database support (PostgreSQL, MongoDB)
- ✅ SaaS billing (Stripe, LemonSqueezy)
- ✅ Admin dashboard
- ✅ Custom domain + SSL
- ✅ Report downloads via email
- ✅ Advanced analysis (correlation, outlier detection)

---

## 🛠️ Maintainer Notes

- Don't commit `venv/`, `__pycache__/`, or build folders
- Always update `requirements.txt` and `package.json` on new changes
- Use production CORS settings
- For help/contributions, check the **Contact Us** section in the app

---

**📌 End of README**
