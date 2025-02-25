import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

# Load existing grouped dataset
df_numeric = pd.read_csv("student_groups_updated.csv")
score_columns = ["math score", "reading score", "writing score"]

# Refit the scaler used in model4.py
scaler = StandardScaler()
df_numeric[score_columns] = scaler.fit_transform(df_numeric[score_columns])

def assign_unique_strengths_weaknesses(group_members):
    assigned_strengths = set()
    assigned_weaknesses = set()
    student_info = []

    for _, row in group_members.iterrows():
        RollNumber = int(row["Roll Number"])
        student_scores = row[score_columns].to_dict()
        sorted_subjects = sorted(student_scores, key=student_scores.get, reverse=True)
        
        strength = next((s for s in sorted_subjects if s not in assigned_strengths), sorted_subjects[0])
        assigned_strengths.add(strength)
        
        weakness = next((s for s in reversed(sorted_subjects) if s not in assigned_weaknesses), sorted_subjects[-1])
        assigned_weaknesses.add(weakness)
        
        student_info.append((RollNumber, strength, weakness))
    
    return student_info

# Function to assign new student to a group
def assign_new_student(roll_number, new_student_scores):
    new_student_scaled = scaler.transform([list(new_student_scores.values())])
    
    # Compute similarity with existing students
    similarities = cosine_similarity(new_student_scaled, df_numeric[score_columns])
    most_similar_student_index = np.argmax(similarities)
    assigned_group = df_numeric.iloc[most_similar_student_index]["group"]
    
    print(f"\nNew student assigned to Group {assigned_group}")
    
    # Fetch group members
    group_members = df_numeric[df_numeric["group"] == assigned_group]
    student_info = assign_unique_strengths_weaknesses(group_members)
    
    print(f"\n### Strengths & Weaknesses of Group {assigned_group} Members ###")
    for RollNumber, strength, weakness in student_info:
        print(f"Student {RollNumber} is good at: {strength} | Weak in: {weakness}")
    
    # Assign strengths & weaknesses for new student
    sorted_new_subjects = sorted(new_student_scores, key=new_student_scores.get, reverse=True)
    new_student_strength = next((s for s in sorted_new_subjects if s not in {s for _, s, _ in student_info}), sorted_new_subjects[0])
    new_student_weakness = next((s for s in reversed(sorted_new_subjects) if s not in {w for _, _, w in student_info}), sorted_new_subjects[-1])
    
    print(f"\nNew Student {roll_number} is good at: {new_student_strength} | Weak in: {new_student_weakness}")

# Get input from user
roll_number = int(input("Enter Roll Number: "))
math_score = float(input("Enter Math Score: "))
reading_score = float(input("Enter Reading Score: "))
writing_score = float(input("Enter Writing Score: "))

new_student_scores = {"math score": math_score, "reading score": reading_score, "writing score": writing_score}
assign_new_student(roll_number, new_student_scores)
