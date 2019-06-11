import React, {Component} from 'react';

const inputNames = {
  height: {
    title: "Height",
    min: "90",
    max: "245",
    od:  "cm"
  },
  weight: {
    title:"Weight",
    min: "35",
    max: "200",
    od: "kg"
  }
};

class ParametersInput extends React.Component {
  handleChange = (e) => {
    const bmi = this.props.bmi;

    this.props.onHeightChange ? this.props.onHeightChange(e.target.value, bmi):
    this.props.onWeightChange(e.target.value, bmi);
  };

  render() {
    const {title, min, max, od} = this.props.param;
    const {value} = this.props;

    return (
        <div>
            <label
            style={ {fontSize: '18px'}}>
                {title}:
                {min}
                <input
                    type='range'
                    name={title}
                    min={min}
                    max={max}
                    step='1'
                    defaultValue={value}
                    onChange={this.handleChange}
                />
                  {max} <span
                    style={ {fontWeight: 'bold'}}>
                    {value}
                    </span> <span> {od} </span>
            </label>
        </div>
    );
  }
 }

 function calculateBmi(h, w) {
     return  (w / ((h / 100) ** 2)).toFixed(1);
 }

function resultText(bmi) {
    return bmi <= 18.5 ? "Underweight"   :
           bmi <= 24.9 ? "Normal Weight" :
           bmi <= 29.9 ? "Overweight"    :
                         "Obese"
}

function ResultBmi(props) {
        return (
          <div>
            BMI:{props.bmi} {resultText(props.bmi)}
          </div>
    );
}


class Calculator extends React.Component {
  state = {
    bmi: null,
    height: 90,
    weight: 45
  };


  onHeightChange = (height, bmi) => {
    this.setState({
        height: height,
        bmi: bmi
    });

  };

  onWeightChange = (weight, bmi) =>{
    this.setState({
        weight: weight,
        bmi: bmi
    });

  };

  render() {
    const sHeight = this.state.height;
    const sWeight = this.state.weight;
    const resultBmi = calculateBmi(sHeight, sWeight);
    return (
        <div>
             <ParametersInput
                 param={inputNames.height}
                 value={sHeight}
                 onHeightChange={this.onHeightChange}
                 bmi={resultBmi}
             />
              <ParametersInput
                  param={inputNames.weight}
                  value={sWeight}
                  onWeightChange={this.onWeightChange}
                  bmi={resultBmi}
              />
              <ResultBmi
                  bmi={resultBmi}
              />

        </div>
    );
  }
}

function App() {
  return (
    <Calculator/>
  );
}

export default App;
