from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
from scipy.sparse import hstack

app = Flask(__name__)
CORS(app)
model = joblib.load('phish.pkl')
sender_vect = joblib.load('sender_vect.pkl')
receiver_vect = joblib.load('receiver_vect.pkl')
subject_vect = joblib.load('subject_vect.pkl')
body_vect = joblib.load('body_vect.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)

    try:
        sender = sender_vect.transform([data['sender']])[0]
        receiver = receiver_vect.transform([data['receiver']])[0]
        subject = subject_vect.transform([data['subject']])[0]
        body = body_vect.transform([data['body']])[0]

        input_features = hstack([sender, receiver, subject, body])
        prediction = model.predict(input_features)

        return jsonify({'prediction': bool(prediction[0])})

    except ValueError as e:
        return jsonify({'error': f'Invalid input: {str(e)}'}), 400

if __name__ == '__main__':
    app.run(port=8000, debug=True)
