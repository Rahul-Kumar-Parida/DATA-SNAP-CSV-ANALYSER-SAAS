import pandas as pd
import numpy as np
from io import BytesIO

def to_serializable(val):
    if isinstance(val, (np.integer, np.int64, np.int32)):
        return int(val)
    if isinstance(val, (np.floating, np.float64, np.float32)):
        return float(val)
    if isinstance(val, (np.bool_)):
        return bool(val)
    if pd.isna(val):
        return None
    return str(val) if isinstance(val, (np.generic, bytes)) else val

async def analyze_file(file):
    try:
        content = await file.read()
        filename = file.filename.lower()
        if filename.endswith('.csv'):
            df = pd.read_csv(BytesIO(content))
        elif filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(BytesIO(content))
        else:
            return {"error": "Unsupported file type."}

        # General dataset info
        text_summary = []
        text_summary.append(f"The dataset contains {df.shape[1]} columns and {df.shape[0]} rows.")

        # Extra: Detect all-null and all-unique columns
        all_null_cols = [col for col in df.columns if df[col].isnull().all()]
        all_unique_cols = [col for col in df.columns if df[col].nunique() == df.shape[0]]

        if all_null_cols:
            text_summary.append(f"Columns with all null values: {', '.join(all_null_cols)}")
        if all_unique_cols:
            text_summary.append(f"Columns with all unique values (potential IDs): {', '.join(all_unique_cols)}")

        # Per-column analysis
        table = []
        for col in df.columns:
            col_data = df[col]
            col_type = str(col_data.dtype)
            nulls = int(col_data.isnull().sum())
            count = int(col_data.count())
            unique = int(col_data.nunique())
            min_ = to_serializable(col_data.min()) if np.issubdtype(col_data.dtype, np.number) else ""
            max_ = to_serializable(col_data.max()) if np.issubdtype(col_data.dtype, np.number) else ""
            mean = to_serializable(col_data.mean()) if np.issubdtype(col_data.dtype, np.number) else ""
            median = to_serializable(col_data.median()) if np.issubdtype(col_data.dtype, np.number) else ""
            mode = to_serializable(col_data.mode().iloc[0]) if not col_data.mode().empty else ""
            sum_ = to_serializable(col_data.sum()) if np.issubdtype(col_data.dtype, np.number) else ""
            # Top 5 most frequent values
            top_values = {str(k): int(v) for k, v in col_data.value_counts().head(5).to_dict().items()}
            # Detect mixed types
            mixed_types = len(set(type(x) for x in col_data.dropna())) > 1

            table.append({
                "Column": col,
                "Type": col_type,
                "Nulls": nulls,
                "Count": count,
                "Unique": unique,
                "Min": min_,
                "Max": max_,
                "Mean": f"{mean:.2f}" if mean != "" and mean is not None else "",
                "Median": f"{median:.2f}" if median != "" and median is not None else "",
                "Mode": mode,
                "Sum": f"{sum_:.2f}" if sum_ != "" and sum_ is not None else "",
                "Top 5 Values": top_values,
                "Mixed Types": mixed_types,
            })

            # Add to text summary (formatted for clarity)
            summary = f"\nColumn: {col}\n"
            summary += f"  • Type: {col_type}\n"
            summary += f"  • Nulls: {nulls}\n"
            summary += f"  • Count: {count}\n"
            summary += f"  • Unique: {unique}\n"
            if np.issubdtype(col_data.dtype, np.number):
                summary += f"  • Min: {min_}\n"
                summary += f"  • Max: {max_}\n"
                summary += f"  • Mean: {mean}\n"
                summary += f"  • Median: {median}\n"
                summary += f"  • Mode: {mode}\n"
                summary += f"  • Sum: {sum_}\n"
            else:
                summary += f"  • Mode: {mode}\n"
            if mixed_types:
                summary += "  • Warning: mixed data types!\n"
            summary += f"  • Top 5 values: {top_values}\n"
            text_summary.append(summary)

        # Top 5 rows preview (convert all values to serializable)
        top_rows = [
            {col: to_serializable(val) for col, val in row.items()}
            for row in df.head(5).to_dict(orient="records")
        ]

        return {
            "text_summary": "\n".join(text_summary),
            "table_summary": table,
            "top_rows": top_rows
        }
    except Exception as e:
        return {"error": str(e)}