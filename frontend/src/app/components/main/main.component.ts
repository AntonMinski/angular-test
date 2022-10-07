import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BehaviorSubject } from 'rxjs'
import { Tenant } from 'src/app/models/tenant.model'

export interface EditDialogMode {
   mode: 'add' | 'edit'
   tenant: Tenant
}

@Component({
   selector: 'main',
   templateUrl: './main.component.html',
   styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
   email: string | null = ''
   tenants: Tenant[] = []

   searchText = ''
   filterMode: 'all' | 'debt' | 'clear' = 'all'
   private _rows = new BehaviorSubject<Tenant[]>([])
   rows = this._rows.asObservable()

   constructor(public dialog: MatDialog) {}

   ngOnInit() {
      this.email = localStorage.getItem('email')
      this.getTenants()
   }

   /* user actions */
   add() {
      this.dialog
         .open(EditDialog, { data: { mode: 'add' } })
         .afterClosed()
         .toPromise()
         .then((data) => {
            if (data) {
               this.addTenant(data)
            }
         })
   }

   edit(tenant: Tenant) {
      this.dialog
         .open(EditDialog, { data: { mode: 'edit', tenant: tenant } })
         .afterClosed()
         .toPromise()
         .then((data) => {
            if (data) {
               data.id = tenant.id
               this.updateTenant(data)
            }
         })
   }

   delete(tenant: Tenant) {
      this.deleteTenant(tenant.id)
   }

   /* auxiliaries */
   onChange() {
      const filtered = this.tenants.filter((t) => {
         // check search criteria
         if (
            !t.name.includes(this.searchText) &&
            !t.phone.includes(this.searchText) &&
            !t.address.includes(this.searchText)
         ) {
            return false
         }

         // filter by debt selection mode
         switch (this.filterMode) {
            case 'clear':
               return t.debt <= 0
            case 'debt':
               return t.debt > 0
            default:
               return true
         }
      })

      this._rows.next(filtered)
   }

   /* _services */
   getTenants() {
      // TODO: connect to backend
   }

   addTenant(tenant: Tenant) {
      // TODO: connect to backend
   }

   updateTenant(tenant: Tenant) {
      // TODO: connect to backend
   }

   deleteTenant(id: string) {
      // TODO: connect to backend
   }

   logout() {
      // TODO: connect to backend
   }
}

@Component({
   selector: 'edit-dialog',
   templateUrl: 'edit.dialog.html',
})
export class EditDialog {
   name = ''
   editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      debt: 0,
   })

   constructor(
      public formBuilder: FormBuilder,
      public editDialog: MatDialogRef<EditDialog>,
      @Inject(MAT_DIALOG_DATA) public data: EditDialogMode
   ) {
      editDialog.afterOpened().subscribe(() => {
         if (data.mode == 'edit') {
            this.name = data.tenant.name
            this.editForm = this.formBuilder.group({
               name: [data.tenant.name, [Validators.required]],
               phone: [data.tenant.phone, [Validators.required]],
               address: [data.tenant.address, [Validators.required]],
               debt: [data.tenant.debt],
            })
         }
      })
   }

   save() {
      if (this.editForm.invalid) {
         return
      }

      this.editDialog.close({
         name: this.editForm.controls.name.value,
         phone: this.editForm.controls.phone.value,
         address: this.editForm.controls.address.value,
         debt: this.editForm.controls.debt.value,
      })
   }

   cancel() {
      this.editDialog.close()
   }
}
