import {Injectable} from '@angular/core';
import {APIService} from "./api.service";

@Injectable()
export class ParseService {

    constructor(private apiService: APIService) {
    }

    public parseImage(image: Blob): Promise<string> {
        return this.apiService.postImage("/", image);
    }

}