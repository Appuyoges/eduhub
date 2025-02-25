import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors

# Load datasets
students_df = pd.read_csv("C:\Heena\student group\studentmarks_with_skills.csv")
events_df = pd.read_csv("C:\Heena\student group\college_events.csv")

def get_student_skills(roll_number):
    """Retrieve skills for a given student roll number."""
    student = students_df[students_df['Roll Number'] == roll_number]
    if not student.empty:
        return student.iloc[0]['Skills']
    return None

def train_event_model():
    """Train a Nearest Neighbors model for event recommendation."""
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(events_df['required_skills'])
    model = NearestNeighbors(n_neighbors=5, metric='cosine')
    model.fit(tfidf_matrix)
    return model, vectorizer, tfidf_matrix

def suggest_events_by_roll_number(roll_number, top_n=3):
    """Suggest events based on student roll number using ML model."""
    student_skills = get_student_skills(roll_number)
    if not student_skills:
        return "No skills found for this roll number."
    
    model, vectorizer, tfidf_matrix = train_event_model()
    student_vector = vectorizer.transform([student_skills])
    distances, indices = model.kneighbors(student_vector, n_neighbors=top_n)
    
    return events_df.iloc[indices[0]]

# Example usage
roll_number = int(input("enter your roll number:"))  # Replace with actual roll number
recommendations = suggest_events_by_roll_number(roll_number)
print("Recommended Events:")
print(recommendations[['event_name', 'required_skills']])
