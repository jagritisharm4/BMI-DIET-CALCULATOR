const bmiForm = document.getElementById('bmi-form');
const resultCard = document.getElementById('result');
const bmiValueEl = document.getElementById('bmi-value');
const bmiCategoryEl = document.getElementById('bmi-category');
const bmiAdviceEl = document.getElementById('bmi-advice');
const resetBtn = document.getElementById('reset-btn');
const weightUnitEl = document.getElementById('weight-unit');
const heightUnitEl = document.getElementById('height-unit');
const unitInputs = document.querySelectorAll('input[name="units"]');

const categories = [
  { label: 'Underweight', advice: 'You may benefit from a balanced meal plan with more nutrient-dense calories.', range: [0, 18.5], color: '#7FB3D5' },
  { label: 'Healthy weight', advice: 'Maintain a balanced diet and regular activity to stay in this range.', range: [18.5, 24.9], color: '#7ED321' },
  { label: 'Overweight', advice: 'Focus on nutritious foods, portion control, and consistent movement.', range: [24.9, 29.9], color: '#F5A623' },
  { label: 'Obesity', advice: 'Consider professional guidance for a safe plan that supports your health goals.', range: [29.9, Infinity], color: '#EB5757' }
];

function updateUnitLabels(units) {
  if (units === 'imperial') {
    weightUnitEl.textContent = 'lb';
    heightUnitEl.textContent = 'in';
  } else {
    weightUnitEl.textContent = 'kg';
    heightUnitEl.textContent = 'cm';
  }
}

function getBodyMassIndex(weight, height, units) {
  if (units === 'imperial') {
    const weightKg = weight * 0.45359237;
    const heightMeters = height * 0.0254;
    return weightKg / (heightMeters * heightMeters);
  }

  const heightMeters = height / 100;
  return weight / (heightMeters * heightMeters);
}

function getCategory(bmi) {
  return categories.find(category => bmi <= category.range[1]);
}

function displayResult(bmi) {
  const roundedBMI = bmi.toFixed(1);
  const category = getCategory(bmi);

  bmiValueEl.textContent = roundedBMI;
  bmiCategoryEl.textContent = category.label;
  bmiCategoryEl.style.color = category.color;
  bmiAdviceEl.textContent = category.advice;
  resultCard.classList.remove('hidden');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const weight = parseFloat(bmiForm.weight.value);
  const height = parseFloat(bmiForm.height.value);
  const units = bmiForm.units.value;

  if (!weight || !height || weight <= 0 || height <= 0) {
    alert('Please enter valid weight and height values.');
    return;
  }

  const bmi = getBodyMassIndex(weight, height, units);
  displayResult(bmi);
}

function resetForm() {
  bmiForm.reset();
  updateUnitLabels('metric');
  resultCard.classList.add('hidden');
}

bmiForm.addEventListener('submit', handleFormSubmit);
resetBtn.addEventListener('click', resetForm);

unitInputs.forEach(input => {
  input.addEventListener('change', () => {
    updateUnitLabels(input.value);
  });
});

updateUnitLabels('metric');
