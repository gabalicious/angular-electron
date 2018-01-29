import {Component, ViewEncapsulation} from "@angular/core";
import "xterm/dist/xterm.css"
import "xterm/lib/addons/fullscreen/fullscreen.css"
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as terminado from 'xterm/lib/addons/terminado/terminado';

// console.log(fullscreen, fit)

Terminal.applyAddon(fullscreen);
Terminal.applyAddon(attach);  // Apply the `attach` addon
Terminal.applyAddon(fit);  // Apply the `fit` addon
Terminal.applyAddon(terminado);  // Apply the `terminado` addon

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(){
    this.input = '';
  }
  ngOnInit() {

    this.term = new Terminal();
    var socketURL = 'ws://localhost:8010/websocket';
    console.log(socketURL)
    var socket = new WebSocket(socketURL);
    socket.onmessage = function(e){ console.log(e.data); };
    socket.onopen = () => conn.send('hello');
    this.container = document.getElementById('terminal-container');
    this.term.open(this.container);



    this.term.writeln('Welcome to xterm.js');
    this.term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
    this.term.writeln('Type some keys and commands to play around.');
    this.term.writeln('');
    this.term.attach(socket);  // Attach the above socket to `term`
    this.term.toggleFullScreen(true);  // Now the terminal should occupy the full viewport
    // this.term.fit();  // Make the terminal's size and geometry fit the size of #terminal-container

    this.term.on('key',  (key, ev)=>{
      console.log(key)
      console.log(ev)

      if (ev.key === 'Enter'){
        this.term.writeln('');
        this.input = ''
        this.term.terminadoAttach(socket, true, true);

      }else{
        this.term.write(key); //Error here, not found the 'write' property, this.term is not recognized correctly.
      }
    });
    this.term.on('lineFeed',  (key, ev)=>{
      console.log(key)
      console.log(ev)
    });

  }

}
