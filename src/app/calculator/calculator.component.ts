import { Component } from '@angular/core';
import { LocalService } from '../local-service/localService.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '../shared/model/data.model';
import { AlertService } from '../shared/alert-service/alertService.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  constructor(
    private localStore: LocalService,
    private formBuilder: FormBuilder,
    private alertSvc: AlertService
  ) {}
  
  displayValue = "0";
  tempValue = "";
  isOperator = false;
  operator = "";

  calculatorForm = this.formBuilder.group({
    userName: ['', Validators.required],
    typeName: ['', Validators.required]
  });

  onCalculate() {
    let a = parseFloat(this.displayValue);
    let b = parseFloat(this.tempValue);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return
    }
    
    switch(this.operator) {
      case "+":
        this.displayValue = String(a + b);
        break;
      case "-":
        this.displayValue = String(a - b);
        break;
      case "×":
        this.displayValue = String(a * b);
        break;
      case "÷":
        this.displayValue = String(a / b);
        break;
      case "%":
        this.displayValue = String(a % b);
        break;
    }

    this.tempValue = "";
    this.operator = "";
    this.isOperator = false;
  }

  onOperator(op: string) {
    this.isOperator = true;
    this.operator = op;
  }

  onAddValue(newValue: string) {
    if ((this.displayValue.includes('.') && newValue === '.') || (this.tempValue.includes('.') && newValue === '.')) {
      return;
    }

    if (!this.operator) {
      if (this.displayValue === "0" && newValue !='.') {
        this.displayValue = this.displayValue.substring(1);
      }
      this.displayValue += newValue;
    }
    else {
      if (this.tempValue === "0" && newValue !='.') {
        this.tempValue = this.tempValue.substring(1);
      }
      this.tempValue += newValue;
    } 
  }

  onClearValue() {
    this.displayValue = "0";
    this.tempValue = "";
    this.isOperator = false;
    this.operator = "";
  }

  onDeleteValue() {
    if (!this.isOperator) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.tempValue = this.tempValue.slice(0, -1);
    }
  }

  onSave() {
    if (this.calculatorForm.valid) {
      const sendData = new Data(this.calculatorForm.value.userName as string, this.calculatorForm.value.typeName as string, parseFloat(this.displayValue));
      let listData: Data[] = this.localStore.getData('userData');

      if (listData != null) {
        this.localStore.removeData('userData')
      } else {
        listData = [];
      }
      
      listData.push(sendData);
      this.localStore.saveData('userData', listData);
      this.calculatorForm.reset();
      this.alertSvc.successNotification();
      this.onClearValue();
    }
  }
}
