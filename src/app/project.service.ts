import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Project } from './models/project';
import { Observable } from 'rxjs';
import { ProjectUserAssociation } from './models/project-user-association';
import { NewProject } from './models/NewProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient, private auth: AuthService) { }
  
  private _getProjectByUser = "http://54.234.155.122:8000/api/getProjectbyUser";
  private _addUserToProject = "http://54.234.155.122:8000/api/addUserToProject";
  private _removeUserToProject = "http://54.234.155.122:8000/api/removeUserToProject";
  private _getMembersOfProject = "http://54.234.155.122:8000/api/getMembersOfProject";
  private _getLatestProjectByUser = "http://54.234.155.122:8000/api/getLatestProjectByUser";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `${this.auth.getToken()}`,
      "Content-Security-Policy":"upgrade-insecure-requests"
   })
  }


  getProjectbyUser() {
    return this.http.get<Project[]>(this._getProjectByUser, this.httpOptions);
  }

  addUserToProject(IdProject: ProjectUserAssociation):Observable<ProjectUserAssociation> {
    return this.http.post<ProjectUserAssociation>(this._addUserToProject, IdProject, this.httpOptions);
  }

  removeUserToProject(IdProject: ProjectUserAssociation):Observable<ProjectUserAssociation> {
    return this.http.post<ProjectUserAssociation>(this._removeUserToProject, IdProject, this.httpOptions);
  }
  

  getMembersOfProject(IdProject: ProjectUserAssociation):Observable<ProjectUserAssociation> {
    return this.http.post<ProjectUserAssociation>(this._getMembersOfProject, IdProject, this.httpOptions);
  }

  createNewProject(projet :NewProject):Observable<NewProject> {

    var myProject = {"name": projet.name, "users":projet.users,"tokenOwner":''+projet.tokenOwner}

    return this.http.post<NewProject>("http://54.234.155.122:8000/api/createNewProject", myProject, this.httpOptions);
  }

  getLatestProjectByUser() {
    return this.http.get<Project[]>(this._getLatestProjectByUser, this.httpOptions);
  }



}
