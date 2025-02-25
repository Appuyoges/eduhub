import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from collections import defaultdict

# Load datasets
df_students = pd.read_csv("C:\Heena\student group\student_groups_updated.csv")
df_mentors = pd.read_csv("C:\Heena\student group\mentor_dataset.csv")

# Calculate group performance
group_avg_scores = df_students.groupby("group")[["math score", "reading score", "writing score"]].mean()
group_avg_scores["Overall Score"] = group_avg_scores.mean(axis=1)

# Perform K-Means clustering to categorize groups into performance levels
num_clusters = 3  # High, Medium, Low performing groups
kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
group_avg_scores["Performance Cluster"] = kmeans.fit_predict(group_avg_scores[["Overall Score"]])

# Sort mentors by experience (descending order)
df_mentors_sorted = df_mentors.sort_values("Experience (Years)", ascending=False).reset_index(drop=True)

# Extract mentor expertise and experience
mentor_expertise = df_mentors_sorted.set_index("Mentor ID")["Subject Expertise"]
mentor_experience = df_mentors_sorted.set_index("Mentor ID")["Experience (Years)"]

# Assign mentors based on group weaknesses
mentor_assignments = defaultdict(list)  # Dictionary to store which groups are assigned to each mentor
assigned_groups = set()  # Set to keep track of assigned groups
mentor_load = defaultdict(int)  # Track how many groups each mentor has
MAX_GROUPS_PER_MENTOR = 4  # Max number of groups per mentor

# Function to find the best mentor for a given group
def find_best_mentor(group_id, group_scores):
    best_mentor = None
    best_distance = float("inf")

    for _, mentor in df_mentors_sorted.iterrows():
        mentor_id = mentor["Mentor ID"]
        if mentor_load[mentor_id] >= MAX_GROUPS_PER_MENTOR:
            continue  # Skip if mentor has max groups assigned
        
        mentor_subject = mentor["Subject Expertise"]
        
        # Determine the weakness of the group in the mentor's subject
        if mentor_subject == "math":
            weakness = group_scores["math score"]
        elif mentor_subject == "reading":
            weakness = group_scores["reading score"]
        else:
            weakness = group_scores["writing score"]

        # Calculate difference (higher difference means weaker area)
        distance = abs(weakness - group_scores.mean())

        # Assign the best match
        if distance < best_distance:
            best_distance = distance
            best_mentor = mentor_id

    return best_mentor

# Assign mentors to groups ensuring uniqueness
for group_id, group_scores in group_avg_scores.iterrows():
    if group_id not in assigned_groups:
        best_mentor = find_best_mentor(group_id, group_scores)
        if best_mentor:
            mentor_assignments[best_mentor].append(group_id)
            assigned_groups.add(group_id)
            mentor_load[best_mentor] += 1

# Convert assignments into a DataFrame for output
mentor_groups_df = pd.DataFrame(
    {"Assigned Mentor": list(mentor_assignments.keys()), "Groups Assigned": list(mentor_assignments.values())}
)

print("Mentor Assignments:")
print(mentor_groups_df)

# Save updated dataset with mentor assignments
df_students["Assigned Mentor"] = df_students["group"].map(
    {group: mentor for mentor, groups in mentor_assignments.items() for group in groups}
)
df_students.to_csv("student_groups_with_mentors.csv", index=False)

