import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-debit-pop-up',
  templateUrl: './debit-pop-up.component.html',
  styleUrls: ['./debit-pop-up.component.css']
})

export class DebitPopUpComponent {

  @Output() popupClosedEvent: EventEmitter<any> = new EventEmitter();

  closePopupOutside(event: any) {
    if (event.target.classList.contains('popup-container')) {
      this.popupClosedEvent.emit();
    }
  }

  close() {
    this.popupClosedEvent.emit();
  }

  showOverlay: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  finalizePayment() {
    this.showOverlay = true; // Exibe o overlay de loading
    this.simulatePaymentProcess();
  }

  simulatePaymentProcess() {
    setTimeout(() => {
      const paymentApproved = this.simulatePaymentApproval(); // Simula o pagamento
      this.showOverlay = false; // Esconde o overlay
      if (paymentApproved) {
        this.showSuccessMessage = true; // Exibe a mensagem de sucesso
      } else {
        this.showErrorMessage = true; // Exibe a mensagem de erro
      }
      setTimeout(() => {
        this.showSuccessMessage = false; // Esconde a mensagem após 2 segundos
        this.showErrorMessage = false; // Esconde a mensagem após 2 segundos
      }, 2000);
    }, 2000);
  }

  simulatePaymentApproval(): boolean {
    // Simulação de aprovação de pagamento (retorna verdadeiro ou falso)
    const paymentApproved = Math.random() < 0.8; // 80% de chance de aprovação
    return paymentApproved;
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

}
