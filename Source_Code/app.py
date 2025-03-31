from flask import Flask, render_template, request, send_from_directory, jsonify
import os
from keras.preprocessing.image import load_img, img_to_array
from keras.applications.vgg19 import preprocess_input
from keras.models import load_model
import numpy as np

app = Flask(__name__)

# Load the custom-trained model
model = load_model(r'C:\Users\TRIVENI\Desktop\TR\static\soybean_leaf_disease_model.h5')

# Define the classes for soybean leaf detection
classes = ['Caterpillar', 'Healthy', 'Diabrotica speciosa']

# Create directory to save uploaded images
UPLOAD_FOLDER = './static/uploaded_images'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def index():
    return render_template('index1.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'imagefile' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    imagefile = request.files['imagefile']
    if imagefile.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the image
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], imagefile.filename)
    imagefile.save(image_path)

    # Preprocess the image
    try:
        image = load_img(image_path, target_size=(224, 224))
        image = img_to_array(image)
        image = np.expand_dims(image, axis=0)
        image = preprocess_input(image)
    except Exception as e:
        return jsonify({'error': f"Error processing image: {e}"}), 500

    # Predict
    try:
        predictions = model.predict(image)
        class_index = np.argmax(predictions)
        classification = {
            'class': classes[class_index],
            'confidence': f"{predictions[0][class_index] * 100:.2f}%"
        }
    except Exception as e:
        return jsonify({'error': f"Prediction error: {e}"}), 500

    return jsonify({'prediction': classification, 'image_path': imagefile.filename})

@app.route('/uploaded_images/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(port=3000, debug=True)
