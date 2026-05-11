import {  Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Location } from '@angular/common'
export type ServerResponse = {
    count: number,
    rows: any[]
}


@Injectable({
    providedIn: 'root'
})
export class ServerService {

    wrongInput: boolean = false;
    url: string = 'http://localhost:3000/';
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });



    constructor(
        private http: HttpClient,
        private router: Router,
        private _location: Location,
    ) { }

    async get(path: string): Promise<{ total: number, data: any[] } | any> {
        const res = await this.http.get(this.url + path, { headers: this.headers }).toPromise();
        return res;
    }

    async post(path: string, body: Object) {
        let res =

            await this.http.post(this.url + path, body, { headers: this.headers }).toPromise();
        return res;
    }

        async postMidi(path: string, body: Object) {
        let res =

            await this.http.post(this.url + path, body).toPromise();
        return res;
    }

    async put(path: string, body: any): Promise<any> {
        return this.http.put(this.url + path, body, { headers: this.headers }).toPromise();
    }

    async update(path: string, id: string, body: Object, settle?: boolean) {

        let res = await this.http.patch(this.url + path + '/' + id, body, { headers: this.headers }).toPromise();
        return res;

    }

    async delete(path: string, id: string) {
        let res = await this.http.delete(this.url + path + '/' + id, { headers: this.headers }).toPromise();
        return res;
    }
    navigateURL(url: string) {
        console.log(url);
        this.router.navigate([url]);
    }
    back() {
        this._location.back()
    }

}
