import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rolenameformat'
})
export class RolenameformatPipe implements PipeTransform {

  transform(role: any, params: string): string {
    if (role !== null || role !== undefined) {
      if(role.editor == true){
        return 'Editor'
      }else{
        if(role.admin == true){
          return 'Administrador'
        }else{
          return 'Rol no asignado';
        }
      }
    }
  }

}
