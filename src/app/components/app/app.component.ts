import { Component, OnInit } from '@angular/core'
import { DomScriptLoaderService } from '../../services/dom-script-loader.service'
import { environment } from '../../../environments/environment'

const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}&libraries=places`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  googleMapsLoaded = false

  ngOnInit () {
    const service = new DomScriptLoaderService()
    service.load(googleMapsUrl).then(alreadyLoaded => {
      this.googleMapsLoaded = true
    })
  }
}
