import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pandas as pd

# Dummy data
data = {
    'text': [
        "Free money now", "Win a lottery", "Click here for prize", "Urgent business proposal",
        "Hello friend, how are you?", "Meeting at 3pm", "Can we catch up?", "Project update",
        "Congratulations! You won.", "Exclusive offer just for you",
        "Hey, see you tomorrow", "Please review the attached document"
    ],
    'label': [1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0] # 1 = Spam, 0 = Safe
}

df = pd.DataFrame(data)

# Create a simple pipeline
model = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', MultinomialNB())
])

# Train
model.fit(df['text'], df['label'])

# Save
output_path = "backend/models/spam_detector.joblib"
joblib.dump(model, output_path)
print(f"Dummy model saved to {output_path}")
