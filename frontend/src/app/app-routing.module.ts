import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { CardComponent } from "./card/card.component";
import { ElectronicEducationalResourcesComponent } from "./electronic-educational-resources/electronic-educational-resources.component";
import { EnterComponent } from "./enter/enter.component";
import { FeedbackComponent } from "./feedback/feedback.component";
import { MainComponent } from "./main/main.component";
import { MethodComponent } from "./method/method.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PhotoComponent } from "./photo/photo.component";
import { AuthGuard } from "./_tools/auth.guard";


const routes: Routes =[
    {path: '', component: MainComponent},
    {path: 'card', component: CardComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'photo', component: PhotoComponent},
    {path: 'methodical_piggy_bank', component: MethodComponent},
    {path: 'electronic_educational_resources', component: ElectronicEducationalResourcesComponent},
    {path: 'login', component: EnterComponent},
    {path: 'admin',canActivate:[AuthGuard] , component: AdminComponent},
    {path: '**', component: NotFoundComponent},

];
@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
export class AppRoutingModule{

}