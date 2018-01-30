import {Component, ViewEncapsulation} from "@angular/core";
import "./global-styles.scss"
import * as mcss from "./app.mcss"
import { spawn, exec } from 'child_process';
const sh = require("shelljs");
const path = require('path')
const ogPath = path.resolve(process.cwd(), '..');

@Component({
  selector: '#app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(){
    this.mcss = mcss;
    this.alwaysFocusInput();
    this.output = '';
    this.history = [];
    this.currentDir = ogPath;
    // this.currentDir = path.resolve(process.cwd(), '..');

  }

  terminalExec(input) {
    let parentDir =  this.currentDir ||  '/Users/justingaba/development/';
    let writeHistory = this.writeHistory.bind(this);

    let cmd = exec(`${input};pwd`, {
      cwd: parentDir
    });

    console.log(input)
    cmd.stdin.on('data', function (data) {

      writeHistory(data.split(/\n/));
      console.log({input, status: 'in', output: data.split(/\n/)})
    });

    cmd.stdout.on('data', function (data) {
      writeHistory(data.split(/\n/));
      console.log({input, status: 'out', output: data.split(/\n/)})
    });

    cmd.stderr.on('data', function (data) {
      writeHistory(data.split(/\n/));
      console.log({input, status: 'err', output: data.split(/\n/)})
    });

    cmd.on('close', function (code) {
      console.log('exit')

      });
      // console.log(this.history)

    }
    onSubmit(f: NgForm){
      this.writeHistory(this.userInput)
      this.terminalExec(this.userInput);
      this.userInput = '';
    }
    alwaysFocusInput(){
      setInterval(function(){
        var focusbox;
        focusbox = document.getElementById("input");
        focusbox.focus();
      })
    }

    getHistory(){
      return this.history;
    }
    writeHistory(item){
      console.log(item)
      if(typeof item === "string"){
        this.history.push(item);

      }
      else if(Array.isArray(item)){
        // last item is pwd; make this currentDir

        this.currentDir = item[item.length-2]
        console.log(  this.currentDir )
        console.log( item[item.length-2] )
        item.forEach((i)=> {
          this.history.push(i);
        });
      }
    }

  }
