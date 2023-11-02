import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService{
  public successNotification() {
    // Swal.fire('Hi', 'We have been informed!', 'success');
    Swal.fire({
      title: 'Success',
      text: 'We have been informed!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#0000FF',
    })
  }

  public alertConfirmation(functionCallback: any, data: any, localStore: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      confirmButtonColor: '#FF0000',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        functionCallback(data, localStore);
        Swal.fire('Removed!', 'Data removed successfully.', 'success').then(()=>{location. reload()})
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Data still in local storage.)', 'error');
      }
    });
  }
}