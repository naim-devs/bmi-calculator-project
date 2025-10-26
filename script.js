// script.js (ADVANCED Data Halo Doughnut Chart Logic)

// Get references to the HTML elements
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');
const resultDiv = document.getElementById('result');

// Function to dynamically create the advanced result structure
function setupResultStructure() {
    // Check if the advanced structure is already present
    if (document.getElementById('bmi-value')) return; 

    // Inject the advanced indicator HTML into the result div
    resultDiv.innerHTML = `
        <div class="result-container">
            <div class="result-card">
                
                <!-- Advanced BMI Visualization Area -->
                <div class="bmi-halo-chart">
                    <div class="chart-progress">
                        <div class="chart-inner-circle">
                            <h3 class="bmi-result-label">BMI</h3>
                            <span id="bmi-value">--</span>
                        </div>
                    </div>
                </div>
                
                <p id="bmi-status" class="status-default">Ready for Calculation</p>
            </div>
        </div>
        <div class="disclaimer">
            <p>BMI is an estimate and should not replace professional medical advice.</p>
        </div>
    `;
}

// Main function triggered by the button click (HTML calls this: onclick="calculateBMI()")
function calculateBMI() {
    // 1. Initial Setup and Validation
    setupResultStructure(); 

    const bmiValueElement = document.getElementById('bmi-value');
    const bmiStatusElement = document.getElementById('bmi-status');
    const chartProgress = document.querySelector('.chart-progress');
    const resultCard = document.querySelector('.result-card');

    // Reset styles/classes and CSS variables
    // Remove previous status classes for a clean update
    resultCard.className = 'result-card'; 
    bmiStatusElement.className = 'status-default';
    
    resultCard.style.setProperty('--halo-size', '0px'); 
    chartProgress.style.setProperty('--progress-deg', '0deg');
    
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        bmiValueElement.textContent = '--';
        bmiStatusElement.textContent = 'Please enter valid positive Height and Weight (cm & kg).';
        return;
    }

    // 2. BMI Calculation
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    bmiValueElement.textContent = bmi;

    let status = '';
    let statusClass = '';

    // 3. Determine Status and Assign Class
    if (bmi < 18.5) {
        status = 'Underweight (Risk)';
        statusClass = 'status-underweight';
    } else if (bmi <= 24.9) {
        status = 'Normal Weight (Optimal)';
        statusClass = 'status-normal';
    } else if (bmi <= 29.9) {
        status = 'Overweight (Warning)';
        statusClass = 'status-overweight';
    } else {
        status = 'Obese (High Risk)';
        statusClass = 'status-obese';
    }

    // 4. Calculate Advanced Visualization Data (Progress Bar)
    const minBMI = 10;
    const maxBMI = 50; 
    let percentage = Math.max(0, Math.min(1, (bmi - minBMI) / (maxBMI - minBMI)));
    let progressDegree = percentage * 360;

    // 5. Update UI (Indicator and Status)
    bmiStatusElement.textContent = status;
    
    // **KEY STEP: Add the status class to the result-card**
    // This action instantly sets the CSS variables (--current-color, --current-color-rgb) 
    // for the indicator (Progress Bar and Halo) based on the class.
    resultCard.classList.add(statusClass); 
    bmiStatusElement.classList.add(statusClass);
    
    // Set CSS variables with a slight delay to ensure smooth transition
    setTimeout(() => {
        // Activate the Halo/Aura effect
        resultCard.style.setProperty('--halo-size', '30px'); 
        
        // Update Doughnut chart progress
        chartProgress.style.setProperty('--progress-deg', `${progressDegree}deg`); 
    }, 50); 
}
