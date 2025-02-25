import pandas as pd
import numpy as np
import networkx as nx
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
from scipy.optimize import linear_sum_assignment

# Load dataset
df = pd.read_csv(r"C:\Heena\student group\datasets\studentmarksFIN.csv")
score_columns = ["math score", "reading score", "writing score"]
df_numeric = df[["Roll Number"] + score_columns].copy()

# Normalize scores for better clustering
scaler = StandardScaler()
df_numeric[score_columns] = scaler.fit_transform(df_numeric[score_columns])

# Compute pairwise similarity (cosine similarity works well for grouping diverse students)
similarity_matrix = cosine_similarity(df_numeric[score_columns])
np.fill_diagonal(similarity_matrix, 0)  # Remove self-similarity

# Create a graph where nodes are students and edges represent similarity
G = nx.Graph()
for i in range(len(df_numeric)):
    for j in range(i + 1, len(df_numeric)):
        G.add_edge(i, j, weight=similarity_matrix[i, j])

# Determine the number of groups (ensuring 5-6 students per group)
total_students = len(df_numeric)
num_groups = total_students // 5  # Approximate number of groups

# Perform graph partitioning using spectral clustering
from networkx.algorithms.community import kernighan_lin_bisection
partitions = kernighan_lin_bisection(G, weight='weight')

# Convert partitions into groups with exact sizes
groups = [[] for _ in range(num_groups)]
all_students = list(df_numeric.index)
np.random.shuffle(all_students)

for i, student in enumerate(all_students):
    groups[i % num_groups].append(student)

# Ensure each group has 5-6 members
for i, group in enumerate(groups):
    if len(group) < 5:
        # Move students from the largest group to this group
        largest_group = max(groups, key=len)
        while len(group) < 5 and len(largest_group) > 6:
            group.append(largest_group.pop())

# Assign group numbers
group_assignments = {}
for group_id, group in enumerate(groups):
    for student in group:
        group_assignments[df_numeric.iloc[student]["Roll Number"]] = group_id

df_numeric["group"] = df_numeric["Roll Number"].map(group_assignments)

# Function to assign strengths and weaknesses
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

# Display group members with strengths and weaknesses
for group_id in df_numeric["group"].unique():
    group_members = df_numeric[df_numeric["group"] == group_id]
    student_info = assign_unique_strengths_weaknesses(group_members)
    
    print(f"\n### Strengths & Weaknesses of Group {group_id} Members ###")
    for RollNumber, strength, weakness in student_info:
        print(f"Student {RollNumber} is good at: {strength} | Weak in: {weakness}")

# Save the new grouped dataset
df_numeric.to_csv("student_groups_updated.csv", index=False)
