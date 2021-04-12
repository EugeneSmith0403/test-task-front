import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { MainComponent } from './components/main/main.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';


@NgModule({
  declarations: [MainComponent, WorkspaceComponent],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
  ]
})
export class WorkspaceModule { }
