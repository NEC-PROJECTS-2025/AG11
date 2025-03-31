function displayHomeContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        
        <h2>Deep Learning Solutions for Soybean Leaf Infestation: A VGG19 Approach</h2>
        <h3>Team Members: Triveni Dasari, Supriya Borugadda, BhagyaLakshmi Polimera</h3>

        <!-- Images placed horizontally using flexbox -->
        <div style="display: flex; justify-content: space-around; margin-top: 20px;">
            <div style="text-align: center;">
                <img src="/static/caterpillar (4).jpg" alt="Caterpillar Infestation" style="max-width: 55%; height: auto;">
                <p>Caterpillar Infestation</p>
            </div>
            <div style="text-align: center;">
                <img src="/static/diabroticaspeciosa (10).jpg" alt="Diabrotica Speciosa" style="max-width: 55%; height: auto;">
                <p>Diabrotica Speciosa</p>
            </div>
            <div style="text-align: center;">
                <img src="/static/healthy (4).jpg" alt="Healthy Soybean Leaf" style="max-width: 55%; height: auto;">
                <p>Healthy Soybean Leaf</p>
            </div>
        </div>
       

        
    `;
}

function displayAboutProjectContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        
            <h3 style='text-align:left';>Abstract</h3>
            <p style='text-align:left';>
                Soybean crops are vital to global agriculture, contributing to food security, animal feed, and biofuel production. 
                However, they are increasingly susceptible to pest infestations, notably by <em>Diabrotica speciosa</em> and various caterpillar species, 
                causing significant economic and ecological losses. Traditional pest detection methods, reliant on visual inspections, are often inefficient, 
                prone to errors, and incapable of scaling to meet global demands. 
            </p>
            <p style='text-align:left';>
                This project leverages deep learning techniques, specifically a VGG19-based Convolutional Neural Network (CNN), 
                to develop a robust model for the early detection of pest infestations in soybean leaves. 
                By employing transfer learning, the study achieves high classification accuracy, reducing the dependency on extensive training datasets. 
                The solution sets a new benchmark for pest detection, promoting sustainable agricultural practices through timely interventions 
                and reduced pesticide use.
            </p>
        
            <h3 style='text-align:left';>Introduction</h3>
            <p style='text-align:left';>
                Soybean plants face severe threats from pests like <em>Diabrotica speciosa</em> and caterpillars, which damage leaves, stems, and pods, 
                leading to substantial yield losses. Conventional pest control relies heavily on chemical pesticides, which pose risks to human health, 
                ecosystems, and biodiversity. Integrated Pest Management (IPM) emphasizes early detection and environmentally friendly control 
                methods to mitigate these risks.
            </p>
            <p style='text-align:left';>
                Recent advancements in deep learning offer promising alternatives for addressing these challenges. CNNs, particularly the VGG19 architecture, 
                have demonstrated remarkable success in image recognition tasks. This project adapts VGG19 for the classification of soybean leaf images, 
                distinguishing between healthy leaves and those infested by pests.
            </p>
        
        
        
            <h3 style='text-align:left';>Methodology</h3>
            <p style='text-align:left';>
                1.Dataset:6,410 labeled soybean leaf images sourced from soybean farms in Brazil.
                2.Data Preprocessing:Images resized to 224×224 pixels, normalized, and augmented for consistency.
            3.Model Architecture:VGG19 adapted with transfer learning and optimized layers for binary classification.</li>
               4. Evaluation Metrics:Accuracy, precision, recall, and F1 score to assess performance.
            </p>
        
        
        
            <h3 style='text-align:left';>Results</h3>
            <p style='text-align:left';>The VGG19-based model demonstrated outstanding performance:
            
                1.Accuracy:99.5% for classifying healthy versus infested leaves.
                2.Precision:99%, indicating a low false-positive rate.
                3.F1 Score:99%, reflecting a balance between precision and recall.
            
        </p>
        
        
            <h3 style='text-align:left';>Conclusion</h3>
            <p style='text-align:left';>
                This project highlights the potential of deep learning in tackling agricultural challenges. 
                By adapting VGG19 for pest detection, the model achieves state-of-the-art accuracy, proving invaluable for Integrated Pest Management systems. 
                Future work includes exploring alternative deep learning architectures and applying the model to other crops and pest species.
            </p>
    
    `;
}


function displayPredictionsContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <div id="predictions">
            <h1>Predictions</h1>
            <form id="prediction-form" class="p-3 text-center" enctype="multipart/form-data">
                <input class="form-control" type="file" id="imagefile" name="imagefile" required>
                <button class="btn btn-primary mt-3" type="submit">Predict Image</button>
            </form>
            <div id="result" class="mt-4"></div>
        </div>
    `;

    document.getElementById('prediction-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const imagefile = document.getElementById('imagefile').files[0];
        formData.append('imagefile', imagefile);

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData,
            });

            const resultDiv = document.getElementById('result');

            if (!response.ok) {
                const errorData = await response.json();
                resultDiv.innerHTML = `<p style="color: red;">Error: ${errorData.error}</p>`;
                return;
            }

            const data = await response.json();
            resultDiv.innerHTML = `
                <p>Prediction: <strong>${data.prediction.class}</strong></p>
                <p>Confidence: <strong>${data.prediction.confidence}</strong></p>
                <img src="/uploaded_images/${data.image_path}" class="img-thumbnail mt-3" style="max-width: 300px;">
            `;
        } catch (error) {
            console.error('Error:', error);
        }
    });
}
function displayEvaluationContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
        
        
        <h3 style="text-align:left;">Performance Metrics Table</h3>
        <table style="width: 100%; border-collapse: collapse; text-align: center; margin-top: 15px;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Class</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Accuracy</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Precision</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Recall</th>
                    <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">F1 Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Healthy/Infested</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99.5%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">98%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Healthy/Caterpillars</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99.5%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">100%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Healthy/Diabrotica Speciosa</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">99.5%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">100%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">100%</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">100%</td>
                </tr>
            </tbody>
        </table>
        <h3 style="text-align:left;">1. Accuracy</h3>
        <p style="text-align:left;">
            Accuracy is the most intuitive metric, measuring the proportion of correct predictions (both positive and negative) 
            out of the total predictions made. It reflects how well the model performs across all classes.
        </p>
        <p style="text-align:left;">Accuracy works best when the dataset is balanced (i.e., the number of healthy and infested leaves is similar). However, in cases of imbalanced datasets (e.g., more healthy leaves than infested ones), accuracy can be misleading because a model could achieve high accuracy by favoring the majority class.</p>
        <h4 style="text-align:left;">Formula:</h4>
        <p style="text-align:left;">Accuracy = (True Positives + True Negatives) / Total Instances</p>

        <h3 style="text-align:left;">2. Precision</h3>
        <p style="text-align:left;">Precision measures the proportion of correctly predicted positive instances (e.g., infested leaves) among all instances predicted as positive.</p>
        <p style="text-align:left;">Precision is critical in scenarios where the cost of false positives is high. For example, misclassifying a healthy leaf as infested could lead to unnecessary pesticide application, wasting resources and harming the environment.</p>
        <h4 style="text-align:left;">Formula:</h4>
        <p style="text-align:left;">Precision = (True Positives (TP)) / (False Positives (FP) + True Positives (TP))</p>

        <h3 style="text-align:left;">3. Recall</h3>
        <p style="text-align:left;">Recall measures the proportion of actual positive instances (e.g., infested leaves) that the model successfully identifies.</p>
        <p style="text-align:left;">Recall is crucial when missing a positive instance has significant consequences. For example, failing to detect an infested leaf could allow the infestation to spread, leading to crop loss. Recall emphasizes minimizing false negatives.</p>
        <h4 style="text-align:left;">Formula:</h4>
        <p style="text-align:left;">Recall = (True Positives (TP)) / (False Negatives (FN) + True Positives (TP))</p>

        <h3 style="text-align:left;">4. F1 Score</h3>
        <p style="text-align:left;">The F1 Score is the harmonic mean of precision and recall, providing a single metric to evaluate the balance between the two.</p>
        <p style="text-align:left;">The F1 Score is particularly useful when there is an imbalance between classes (e.g., many healthy leaves but fewer infested ones). It penalizes extreme values of precision or recall and provides a more holistic assessment of model performance.</p>
        <h4 style="text-align:left;">Formula:</h4>
        <p style="text-align:left;">F1 Score = 2 * (Precision * Recall) / (Precision + Recall)</p>
    `;
}


function displayFlowchartContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
    
        <p>The project workflow involves data collection, preprocessing, model training, evaluation, and deployment. Below is a detailed visual representation of the process.</p>
        <img src="/static/flowchart.png" style="max-width: 100%; height: auto;">

    `;
}
